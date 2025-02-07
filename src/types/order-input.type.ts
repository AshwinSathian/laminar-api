import { Field, Float, InputType, ID } from '@nestjs/graphql';

@InputType()
export class OrderItemInput {
  @Field()
  materialId: string;

  @Field(() => Float)
  quantity: number;

  @Field(() => Float)
  unitPrice: number;
}

@InputType()
export class CreateOrderInput {
  @Field()
  referenceId: string;

  @Field()
  supplierId: string;

  @Field(() => [OrderItemInput])
  parts: OrderItemInput[];

  @Field()
  currency: string;

  @Field(() => Float)
  totalValue: number;
}

@InputType()
export class UpdateOrderInput {
  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  invoice?: string;

  @Field(() => Float, { nullable: true })
  totalValue?: number;
}
