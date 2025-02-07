import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Dimensions {
  @Field()
  length: string;

  @Field()
  breadth: string;

  @Field()
  height: string;
}
