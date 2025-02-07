import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { MaterialEmbed } from './material-embed.type';

@ObjectType()
export class OrderItem {
  @Field(() => ID)
  id: string;

  @Field(() => MaterialEmbed)
  part: MaterialEmbed;

  @Field(() => Float)
  quantity: number;

  @Field(() => Float)
  unitPrice: number;
}
