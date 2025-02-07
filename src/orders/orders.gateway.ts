import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  transports: ['websocket', 'polling'],
})
export class OrdersGateway {
  @WebSocketServer()
  server: Server;

  emitOrderUpdate(orderData: { orderId: string; updatedAt: string }) {
    this.server.emit('orderUpdated', orderData);
  }
}
