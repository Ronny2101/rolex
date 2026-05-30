import { Field, InputType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
import { OrderStatus } from "../../enums/order.enum";

@InputType()
export class OrderUpdateInput {
    @Field(() => String)
    _id: ObjectId;

    @Field(() => OrderStatus)
    orderStatus: OrderStatus;
}