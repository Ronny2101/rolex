import { Field, InputType, Int } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
import { OrderStatus } from "../../enums/order.enum";

@InputType()
export class CreateOrderItemInput {
    reduce(arg0: (accumulator: number, item: CreateOrderItemInput) => number, arg1: number) {
        throw new Error("Method not implemented.");
    }
    @Field(()=> Int)
    itemQuantity: number;

    @Field(()=> Int)
    itemPrice: number;

    @Field(() => String)
    propertyId: ObjectId;

    @Field(() => String, {nullable: true})
    orderId?: ObjectId;
}
