import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Phone {
  @Field()
  code: string;

  @Field()
  number: string;
}

@ObjectType()
export class PrimaryContact {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  designation?: string;

  @Field(() => Phone)
  phone: Phone;
}
