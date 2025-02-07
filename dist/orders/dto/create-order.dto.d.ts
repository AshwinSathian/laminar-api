import { OrderStatus } from '@laminar-api/enums';
import { Material, Supplier } from '@laminar-api/interfaces';
declare class OrderItemDTO {
    part: Material;
    quantity: number;
    unitPrice: number;
}
export declare class CreateOrderDTO {
    id?: string;
    parts: OrderItemDTO[];
    supplier: Supplier;
    orderDate: Date;
    status?: OrderStatus;
    invoice?: string;
}
export {};
