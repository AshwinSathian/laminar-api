import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Attachment } from 'src/interfaces/common.interface';

export type BillOfMaterialsDocument = HydratedDocument<BillOfMaterials>;

@Schema()
class AttachmentSchema {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: String, required: true })
  url: string;
}

const AttachmentSchemaFactory = SchemaFactory.createForClass(AttachmentSchema);

@Schema()
class PartDetail {
  @Prop({ type: String, required: true })
  id: string;

  @Prop({ type: String, required: true })
  partNumber: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: false })
  description?: string;

  @Prop({ type: [AttachmentSchemaFactory], required: false })
  images?: Attachment[];

  @Prop({ type: String, required: true })
  material: string;

  @Prop({ type: String, required: true })
  manufacturingMethod: string;

  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: Boolean, required: false })
  nonLinrary?: boolean;

  @Prop({ type: Object, required: false })
  supplierOrManufacturer?: { id: string; name: string };

  @Prop({ type: Number, required: true })
  unitCost: number;

  @Prop({ type: Number, required: true })
  totalPartCost: number;
}

const PartDetailSchema = SchemaFactory.createForClass(PartDetail);

@Schema()
export class BillOfMaterials {
  @Prop({ type: String, required: true, unique: true })
  id: string;

  @Prop({ type: String, required: true })
  productName: string;

  @Prop({ type: String, required: true })
  contactInfo: string;

  @Prop({ type: String, required: true })
  approvedBy: string;

  @Prop({ type: Date, required: true })
  dateOfApproval: Date;

  @Prop({ type: Number, required: true })
  partCount: number;

  @Prop({ type: Number, required: true })
  totalCost: number;

  @Prop({ type: [PartDetailSchema], required: true })
  parts: PartDetail[];

  @Prop({ type: String, required: true })
  currency: string;
}

export const BillOfMaterialsSchema =
  SchemaFactory.createForClass(BillOfMaterials);
