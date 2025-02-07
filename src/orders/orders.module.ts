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
import { FilterParserMiddleware } from 'src/middlewares/filter-parse.middleware';
import { OrdersController } from './orders.controller';
import { OrdersGateway } from './orders.gateway';
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
  controllers: [OrdersController],
  providers: [OrdersService, OrdersGateway],
})
export class OrdersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FilterParserMiddleware).forRoutes('/');
  }
}
