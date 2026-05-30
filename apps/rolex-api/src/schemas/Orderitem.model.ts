import { Schema } from 'mongoose';

const PropertySnapshotSchema = new Schema(
	{
	  _id: { type: Schema.Types.ObjectId, ref: 'Property' },
	  propertyTitle: String,
	  propertyPrice: Number,
	  propertyImages: [String],
	  memberId: { type: Schema.Types.ObjectId, ref: 'Member' },
	  memberNick: String,
	},
	{ _id: false }
  );

const OrderItemSchema = new Schema(
	{
    itemQuantity: { type: Number, required: true, min: 1 },
    itemPrice:    { type: Number, required: true, min: 0 },
    orderId:      { type: Schema.Types.ObjectId, ref: 'Order' },
    propertyId:    { type: Schema.Types.ObjectId, ref: 'Pro' },

    // ✅ snapshot of property at purchase time
    propertyData:  { type: PropertySnapshotSchema, required: false },
  },
	{
		timestamps: true,
		collection: 'orderItems',
	},
);

export default OrderItemSchema;
