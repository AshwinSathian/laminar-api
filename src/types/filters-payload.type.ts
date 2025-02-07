import { Field, Float, InputType } from '@nestjs/graphql';
import { DateFilter } from './date-filter.type';
import { StatusFilter } from './status-filter.type';

@InputType()
export class FiltersPayload {
  @Field(() => StatusFilter, { nullable: true })
  status?: StatusFilter;

  @Field(() => DateFilter, { nullable: true })
  date?: DateFilter;

  @Field(() => Float, { nullable: true })
  value?: {
    min?: number;
    max?: number;
  };
}
