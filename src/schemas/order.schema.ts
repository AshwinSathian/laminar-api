import { OrderStatus } from '@laminar-api/enums';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Supplier, SupplierSchema } from 'src/schemas/supplier.schema';
import { Material, MaterialSchema } from './material.schema';

export type OrderDocument = Order & Document;

@Schema()
class OrderItem {
  @Prop({ type: String, required: true, unique: true })
  id: string;

  @Prop({ type: MaterialSchema, required: true })
  part: Material;

  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: Number, required: true })
  unitPrice: number;

  @Prop({ type: Number, required: true })
  unitTax: number;

  @Prop({ type: String, required: true })
  currency: string;
}

const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

@Schema()
export class Order {
  @Prop({ type: String, required: true, unique: true })
  id: string;

  @Prop({ type: [OrderItemSchema], required: true })
  parts: OrderItem[];

  @Prop({ type: SupplierSchema, required: true })
  supplier: Supplier;

  @Prop({ type: Date, required: true })
  orderDate: Date;

  @Prop({ type: String, enum: OrderStatus, default: OrderStatus.placed })
  status: OrderStatus;

  @Prop({ type: String })
  invoice?: string;

  // @Prop({ type: MetaSchema, required: true })
  // meta: any;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
