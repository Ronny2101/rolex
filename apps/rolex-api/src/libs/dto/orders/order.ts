import { ObjectType, Field, Int } from '@nestjs/graphql';
import { OrderItem } from './order.input.';
import { Property } from '../property/property';
import { OrderStatus } from '../../enums/order.enum';

@ObjectType()
export class Order {
	@Field(() => String)
	_id: string;

	@Field(() => Int)
	orderTotal: number;

	@Field(() => Int)
	orderDelivery: number;

	@Field(() => OrderStatus)
	orderStatus: OrderStatus;

	@Field(() => [OrderItem], { nullable: true })
	orderItems?: OrderItem[]; // this fixes the CannotDetermineOutputTypeError

	@Field(() => String)
	memberId: string;

	@Field(() => Date)
	createdAt: Date;

	@Field(() => Date)
	updatedAt: Date;

	@Field(() => [Property], { nullable: true })
	propertyData?: Property[]; // this fixes the CannotDetermineOutputTypeError
}
