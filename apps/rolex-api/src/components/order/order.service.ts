import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Order } from '../../libs/dto/orders/order';
import { OrderInquiry, OrderItem, OrderItemInput } from '../../libs/dto/orders/order.input.';
import { MemberService } from '../member/member.service';
import { Member } from '../../libs/dto/member/member';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { Message } from '../../libs/enums/common.enum';
import { OrderUpdateInput } from '../../libs/dto/orders/order.update.';
import { NotificationService } from '../notification/notification.service';
import { NotificationGroup, NotificationType } from '../../libs/enums/notification.enum';
import { Property } from '../../libs/dto/property/property';
import { PropertyService } from '../property/property.service';
import { OrderStatus } from '../../libs/enums/order.enum';

@Injectable()
export class OrderService {
	constructor(
		@InjectModel('Order') private readonly orderModel: Model<Order>,
		@InjectModel('property') private readonly propertyModel: Model<Property>,
		@InjectModel('OrderItem') private readonly orderItemModel: Model<OrderItem>,
		@InjectModel('Member') private readonly memberModel: Model<Member>,
		private readonly memberService: MemberService,
		private readonly notificationService: NotificationService,
		private readonly propertyService: PropertyService,
	) {}

	async createOrder(memberId: ObjectId, input: OrderItemInput[]): Promise<Order> {
		const amount = input.reduce((acc, item) => acc + item.itemPrice * item.itemQuantity, 0);
		const delivery = amount < 500000 ? 30 : 0;

		try {
			// 1) Create order
			const newOrder = await this.orderModel.create({
				orderTotal: amount + delivery,
				orderDelivery: delivery,
				memberId: shapeIntoMongoObjectId(memberId),
			});

			// 2) Save items
			await this.recordOrderItems(shapeIntoMongoObjectId(newOrder._id), input);

			// 3) Resolve BUYER (must exist as Member)
			const buyerDoc = await this.memberModel.findById(memberId).lean();
			const buyerNick = buyerDoc?.memberNick || 'A customer';

			// 4) Resolve SELLERS from propertys (unique member ids)
			const propertyIds = input.map((i) => i.propertyId);
			const properties = await Promise.all(propertyIds.map((id) => this.propertyService.findById(id)));
			const rawSellerIds = properties
				.map((p) => (p as any)?.memberId || (p as any)?.ownerId || (p as any)?.authorId)
				.filter(Boolean)
				.map((id: any) => String(id));

			const sellerIdsUnique = Array.from(new Set(rawSellerIds)).map(shapeIntoMongoObjectId);

			// 5) Verify sellers actually exist in Member collection
			const sellersDocs = sellerIdsUnique.length
				? await this.memberModel.find({ _id: { $in: sellerIdsUnique } }, { _id: 1 }).lean()
				: [];
			const existingSellerIds = new Set(sellersDocs.map((d) => String(d._id)));

			// 6) Notify SELLERS (receiver = seller member id). Skip invalid/self ids.
			await Promise.all(
				Array.from(existingSellerIds).map(async (sid) => {
					if (sid === String(memberId)) return;
					await this.notificationService.notify({
						receiverId: shapeIntoMongoObjectId(sid),
						authorId: memberId,
						type: NotificationType.ORDER,
						group: NotificationGroup.PROPERTY,
						title: 'New order',
						desc: `${buyerNick} placed an order.`,
						refId: newOrder._id,
					});
				}),
			);

			const anySellerId = sellersDocs[0]?._id || memberId;
			await this.notificationService.notify({
				receiverId: memberId,
				authorId: anySellerId,
				type: NotificationType.ORDER,
				group: NotificationGroup.PROPERTY,
				title: 'Order created',
				desc: 'Your order has been created.',
				refId: newOrder._id,
			});

			return newOrder;
		} catch (err) {
			console.error('ERROR on createOrder:', err);
			throw new InternalServerErrorException('Create failed.');
		}
	}

	async recordOrderItems(orderId: ObjectId, items: OrderItemInput[]) {
		const enrichedItems = await Promise.all(
			items.map(async (item) => {
				const property = await this.propertyModel.findById(item.propertyId).populate('memberId', 'memberNick').lean();

				return {
					orderId,
					propertyId: item.propertyId,
					itemQuantity: item.itemQuantity,
					itemPrice: item.itemPrice,
					propertyData: {
						_id: property?._id,
						propertyTitle: property?.propertyTitle,
						propertyPrice: property?.propertyPrice,
						propertyImages: Array.isArray(property?.propertyImages) ? property.propertyImages : [],
						memberId: (property?.memberId as any)?._id || property?.memberId || null,
						memberNick: (property as any)?.memberId?.memberNick || '',
					},
				};
			}),
		);

		await this.orderItemModel.insertMany(enrichedItems);
	}

	async getMyOrders(memberId: ObjectId, inquiry: OrderInquiry): Promise<Order[]> {
		if (!memberId) {
			throw new Error('Invalid memberId');
		}

		const shapedMemberId = shapeIntoMongoObjectId(memberId);

		const page = Math.max(1, inquiry.page || 1);
		const limit = Math.max(1, inquiry.limit || 10);

		const result = await this.orderModel
			.aggregate([
				{ $match: { memberId:shapedMemberId } },
				{ $sort: { updatedAt: -1 } },
				{ $skip: (page - 1) * limit },
				{ $limit: limit },

				{
					$lookup: {
						from: 'orderItems',
						localField: '_id',
						foreignField: 'orderId',
						as: 'orderItems',
					},
				},
				{ $unwind: { path: '$orderItems', preserveNullAndEmptyArrays: true } },

				{ $match: { 'orderItems._id': { $exists: true, $ne: null } } },

				{
					$lookup: {
						from: 'properties',
						localField: 'orderItems.propertyId',
						foreignField: '_id',
						as: 'propertyData',
					},
				},
				{ $unwind: { path: '$propertyData', preserveNullAndEmptyArrays: true } },

				{ $addFields: { 'orderItems.propertyData': '$propertyData' } },

				{
					$group: {
						_id: '$_id',
						orderTotal: { $first: '$orderTotal' },
						orderDelivery: { $first: '$orderDelivery' },
						orderStatus: { $first: '$orderStatus' },
						memberId: { $first: '$memberId' },
						createdAt: { $first: '$createdAt' },
						updatedAt: { $first: '$updatedAt' },
						orderItems: { $push: '$orderItems' },
					},
				},

				{ $sort: { updatedAt: -1 } },
			])
			.exec();

		return result ?? [];
	}

	public async updateOrder(memberId: ObjectId, input: OrderUpdateInput): Promise<Order> {
		if (!memberId) {
			throw new Error('Invalid memberId');
		}

		const shapedMemberId = shapeIntoMongoObjectId(memberId);
		const orderId = shapeIntoMongoObjectId(input.orderId);
		const orderStatus = input.orderStatus;

		console.log('Updating order with:', {
			memberId: shapedMemberId.toString(),
			orderId: orderId.toString(),
			orderStatus,
		});

		const updateData: Partial<Order> = { orderStatus };

		const updatedOrder = await this.orderModel
			.findOneAndUpdate({ memberId: shapedMemberId, _id: orderId }, updateData, { new: true })
			.exec();

		if (!updatedOrder) {
			console.error('No order found to update for given memberId and orderId');
			throw new Error(Message.UPDATE_FAILED);
		}

		if (orderStatus === OrderStatus.PROCESS) {
			await this.memberService.addUserPoint(shapedMemberId, 10000);
			console.log(`Added 10000 points to memberId: ${shapedMemberId}`);
		}

		return updatedOrder as Order;
	}
}
