import { registerEnumType } from '@nestjs/graphql';

export enum OrderStatus {
  placed = 'PLACED',
  dispatched = 'DISPATCHED',
  delivered = 'DELIVERED',
}

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
  description: 'Order processing status',
});
