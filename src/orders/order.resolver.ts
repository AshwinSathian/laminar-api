import {
  CreateOrderInput,
  FiltersPayload,
  Order,
  OrderFilterConstraints,
  UpdateOrderInput,
} from '@laminar-api/types';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrdersService } from './orders.service';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Query(() => [Order])
  async getOrders(
    @Args('filters', { type: () => FiltersPayload, nullable: true })
    filters?: FiltersPayload,
  ) {
    return this.ordersService.findAll(filters || {});
  }

  @Query(() => Order, { nullable: true })
  async getOrder(@Args('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Mutation(() => Order)
  async createOrder(@Args('orderData') orderData: CreateOrderInput) {
    return this.ordersService.create(orderData);
  }

  @Mutation(() => Order)
  async updateOrder(
    @Args('id') id: string,
    @Args('updateData') updateData: UpdateOrderInput,
  ) {
    return this.ordersService.update(id, updateData);
  }

  @Mutation(() => Order)
  async deleteOrder(@Args('id') id: string) {
    return this.ordersService.remove(id);
  }

  @Query(() => OrderFilterConstraints)
  async getOrderFilterConstraints() {
    return this.ordersService.getFilterConstraints();
  }

  @Query(() => Number)
  async getOrderCount(): Promise<number> {
    return this.ordersService.countAllOrders();
  }
}
