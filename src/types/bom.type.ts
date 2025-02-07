import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { PartDetail } from './part-detail.type';

@ObjectType()
export class BillOfMaterials {
  @Field(() => ID)
  id: string;

  @Field()
  productName: string;

  @Field()
  contactInfo: string;

  @Field()
  approvedBy: string;

  @Field()
  dateOfApproval: Date;

  @Field(() => Float)
  partCount: number;

  @Field(() => Float)
  totalCost: number;

  @Field(() => [PartDetail])
  parts: PartDetail[];

  @Field()
  currency: string;
}
