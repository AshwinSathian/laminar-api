import { OrderStatus } from '@laminar-api/enums';
import { Attachment } from '@laminar-api/interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AttachmentSchema } from './common.schema';

export type OrderDocument = Order & Document;

@Schema()
class OrderItem {
  @Prop({ type: String, required: true })
  id: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: [AttachmentSchema], required: false })
  images?: Attachment[];

  @Prop({ type: String, required: true })
  material: string;

  @Prop({ type: String, required: true })
  manufacturingMethod: string;

  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: Number, required: true })
  unitPrice: number;

  @Prop({ type: Boolean, required: false })
  nonLinrary?: boolean;
}

const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

@Schema()
export class Order {
  @Prop({ type: String, required: true, unique: true })
  id: string;

  @Prop({ type: String, unique: true })
  referenceId?: string;

  @Prop({ type: [OrderItemSchema], required: true })
  parts: OrderItem[];

  @Prop({
    type: {
      id: { type: String },
      name: { type: String },
    },
    required: false,
  })
  supplier?: { id: string; name: string };

  @Prop({ type: Date, required: true })
  orderDate: Date;

  @Prop({ type: Date, required: false })
  estimatedDeliveryDate?: Date;

  @Prop({ type: String, enum: OrderStatus, default: OrderStatus.placed })
  status: OrderStatus;

  @Prop({ type: Number, required: true })
  totalValue: number;

  @Prop({ type: String, required: true })
  currency: string;

  @Prop({ type: String, required: false })
  invoice?: string;

  @Prop({ type: [AttachmentSchema], required: false })
  otherAttachments?: Attachment[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
