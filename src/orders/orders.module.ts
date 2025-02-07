import { FilterParserMiddleware } from '@laminar-api/middlewares';
import {
  Material,
  MaterialSchema,
  Order,
  OrderSchema,
  Supplier,
  SupplierSchema,
} from '@laminar-api/schemas';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderResolver } from './order.resolver';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MongooseModule.forFeature([
      { name: Material.name, schema: MaterialSchema },
    ]),
    MongooseModule.forFeature([
      { name: Supplier.name, schema: SupplierSchema },
    ]),
  ],
  providers: [OrdersService, OrderResolver],
})
export class OrdersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FilterParserMiddleware).forRoutes('/');
  }
}
