import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Attachment } from './attachment.type';
import { SupplierEmbed } from './supplier-embed.type';

@ObjectType()
export class PartDetail {
  @Field(() => ID)
  partNumber: string;

  @Field()
  partName: string;

  @Field()
  materialId: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [Attachment], { nullable: true })
  partImages?: Attachment[];

  @Field(() => Float)
  quantity: number;

  @Field()
  units: string;

  @Field(() => SupplierEmbed, { nullable: true })
  supplierOrManufacturer?: SupplierEmbed;

  @Field(() => Float)
  unitCost: number;

  @Field(() => Float)
  totalPartCost: number;
}
