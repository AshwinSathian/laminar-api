import { OrderStatus } from '@laminar-api/enums';
import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OrderFilterConstraints {
  @Field(() => [OrderStatus])
  statuses: OrderStatus[];

  @Field()
  oldest: Date;

  @Field()
  newest: Date;

  @Field(() => Float)
  minValue: number;

  @Field(() => Float)
  maxValue: number;
}
