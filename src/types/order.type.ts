import { OrderStatus } from '@laminar-api/enums';
import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { OrderItem } from './order-item.type';
import { SupplierEmbed } from './supplier-embed.type';

@ObjectType()
export class Order {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  referenceId?: string;

  @Field(() => [OrderItem])
  parts: OrderItem[];

  @Field(() => SupplierEmbed)
  supplier: SupplierEmbed;

  @Field()
  orderDate: Date;

  @Field(() => OrderStatus)
  status: OrderStatus;

  @Field({ nullable: true })
  invoice?: string;

  @Field()
  currency: string;

  @Field(() => Float)
  totalValue: number;
}
