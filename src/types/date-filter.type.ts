import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DateFilter {
  @Field({ nullable: true })
  min?: string;

  @Field({ nullable: true })
  max?: string;
}
