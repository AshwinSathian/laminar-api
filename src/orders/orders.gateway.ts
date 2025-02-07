import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true }) // Enable CORS for frontend connection
export class OrdersGateway {
  @WebSocketServer()
  server: Server;

  emitOrderUpdate(orderData: {
    orderId: string;
    newStatus: string;
    updatedAt: string;
  }) {
    this.server.emit('orderUpdated', orderData);
  }
}
