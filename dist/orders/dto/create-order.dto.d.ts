import { OrderStatus } from '@laminar-api/enums';
import { Attachment, Order, OrderItem } from '@laminar-api/interfaces';
declare class AttachmentDTO implements Attachment {
    name: string;
    type: string;
    url: string;
}
declare class OrderItemDTO implements OrderItem {
    id?: string;
    name: string;
    images?: AttachmentDTO[];
    material: string;
    manufacturingMethod: string;
    quantity: number;
    unitPrice: number;
    nonLinrary?: boolean;
}
export declare class CreateOrderDTO implements Order {
    id?: string;
    referenceId?: string;
    parts: OrderItemDTO[];
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
    otherAttachments?: AttachmentDTO[];
}
export {};
