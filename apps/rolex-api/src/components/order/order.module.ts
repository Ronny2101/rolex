import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';
import { MemberModule } from '../member/member.module';
import OrderSchema from '../../schemas/Order.model';
import { AuthModule } from '../auth/auth.module';
import { NotificationModule } from '../notification/notification.module';
import MemberSchema from '../../schemas/Member.model';
import OrderItemSchema from '../../schemas/Orderitem.model';
import PropertySchema from '../../schemas/Property.model';
import { PropertyModule } from '../property/property.module';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'Order', schema: OrderSchema },
			{ name: 'OrderItem', schema: OrderItemSchema },
			{ name: 'property', schema: PropertySchema },
			{ name: 'Member', schema: MemberSchema },
		]),
		AuthModule,
		NotificationModule,
		PropertyModule,
		MemberModule,
	],
	providers: [OrderService, OrderResolver],
	exports: [OrderService],
})
export class OrderModule {}
