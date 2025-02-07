import { OrderStatus } from '@laminar-api/enums';
import { Document } from 'mongoose';
import { Supplier } from 'src/schemas/supplier.schema';
import { Material } from './material.schema';
export type OrderDocument = Order & Document;
declare class OrderItem {
    id: string;
    part: Material;
    quantity: number;
    unitPrice: number;
}
export declare class Order {
    id: string;
    referenceId: string;
    parts: OrderItem[];
    supplier: Supplier;
    orderDate: Date;
    status: OrderStatus;
    invoice?: string;
    currency: string;
    totalValue: number;
}
export declare const OrderSchema: import("mongoose").Schema<Order, import("mongoose").Model<Order, any, any, any, Document<unknown, any, Order> & Order & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Order, Document<unknown, {}, import("mongoose").FlatRecord<Order>> & import("mongoose").FlatRecord<Order> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export {};
