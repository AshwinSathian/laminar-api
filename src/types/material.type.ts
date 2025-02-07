import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Attachment } from './attachment.type';
import { Dimensions } from './dimensions.type';
import { SupplierEmbed } from './supplier-embed.type';

@ObjectType()
export class Material {
  @Field(() => ID)
  id: string;

  @Field()
  partName: string;

  @Field(() => [Attachment], { nullable: true })
  images?: Attachment[];

  @Field()
  material: string;

  @Field()
  manufacturingMethod: string;

  @Field(() => [Attachment], { nullable: true })
  drawings?: Attachment[];

  @Field(() => Dimensions, { nullable: true })
  dimensions?: Dimensions;

  @Field()
  weight: string;

  @Field(() => [Attachment], { nullable: true })
  dataSheets?: Attachment[];

  @Field(() => [SupplierEmbed], { nullable: true })
  suppliers?: SupplierEmbed[];
}
