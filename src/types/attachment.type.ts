import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Attachment {
  @Field()
  name: string;

  @Field()
  type: string;

  @Field()
  url: string;
}
