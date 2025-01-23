import { OrderStatus } from '@laminar-api/enums';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Supplier, SupplierEmbedSchema } from 'src/schemas/supplier.schema';
import { Material, MaterialEmbedSchema } from './material.schema';

export type OrderDocument = Order & Document;

@Schema()
class OrderItem {
  @Prop({ type: String, required: true })
  id: string;

  @Prop({ type: MaterialEmbedSchema, required: true })
  part: Material;

  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: Number, required: true })
  unitPrice: number;
}

const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

@Schema()
export class Order {
  @Prop({ type: String, required: true, unique: true })
  id: string;

  @Prop({ type: String, unique: true })
  referenceId: string;

  @Prop({ type: [OrderItemSchema], required: true })
  parts: OrderItem[];

  @Prop({ type: SupplierEmbedSchema, required: true })
  supplier: Supplier;

  @Prop({ type: Date, required: true })
  orderDate: Date;

  @Prop({ type: String, enum: OrderStatus, default: OrderStatus.placed })
  status: OrderStatus;

  @Prop({ type: String })
  invoice?: string;

  @Prop({ type: String, required: true })
  currency: string;

  @Prop({ type: Number, required: true })
  totalValue: number;

  // @Prop({ type: MetaSchema, required: true })
  // meta: any;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
