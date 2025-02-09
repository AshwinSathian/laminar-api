import { OrderStatus } from '@laminar-api/enums';
import { Attachment } from '@laminar-api/interfaces';
import { Document } from 'mongoose';
export type OrderDocument = Order & Document;
declare class OrderItem {
    id: string;
    name: string;
    images?: Attachment[];
    material: string;
    manufacturingMethod: string;
    quantity: number;
    unitPrice: number;
    nonLinrary?: boolean;
}
export declare class Order {
    id: string;
    referenceId?: string;
    parts: OrderItem[];
    supplier?: {
        id: string;
        name: string;
    };
    orderDate: Date;
    estimatedDeliveryDate?: Date;
    status: OrderStatus;
    totalValue: number;
    currency: string;
    invoice?: string;
    otherAttachments?: Attachment[];
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
