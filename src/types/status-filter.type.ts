import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class StatusFilter {
  @Field({ nullable: true })
  PLACED?: string;

  @Field({ nullable: true })
  DISPATCHED?: string;

  @Field({ nullable: true })
  DELIVERED?: string;

  @Field({ nullable: true })
  CANCELLED?: string;
}
