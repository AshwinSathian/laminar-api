import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Address } from './address.type';

@ObjectType()
export class Inventory {
  @Field(() => ID)
  id: string;

  @Field()
  itemId: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Address, { nullable: true })
  address?: Address;

  @Field({ nullable: true })
  notes?: string;
}
