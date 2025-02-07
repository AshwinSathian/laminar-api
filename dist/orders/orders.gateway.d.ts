import { Server } from 'socket.io';
export declare class OrdersGateway {
    server: Server;
    emitOrderUpdate(orderData: {
        orderId: string;
        updatedAt: string;
    }): void;
}
