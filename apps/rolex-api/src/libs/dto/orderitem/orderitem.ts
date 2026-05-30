import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
import { OrderStatus } from "../../enums/order.enum";

@ObjectType()
export class OrderItem {
    @Field(() => String)
    _id: ObjectId;

    @Field(() => Int)
    itemQunatity: number;

    @Field(() => Int)
    itemPrice: number;

    @Field(() => String)
    orderId: string;

    @Field(() => String)
    propertyId: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}

