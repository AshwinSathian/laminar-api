import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PartDetail } from 'src/interfaces/bom.interface';

export type BillOfMaterialsDocument = HydratedDocument<BillOfMaterials>;

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

  @Prop(
    raw([
      {
        partNumber: { type: String, required: true },
        partName: { type: String, required: true },
        materialId: { type: String, required: true },
        description: { type: String },
        partImages: [{ type: String }],
        quantity: { type: Number, required: true },
        units: { type: String, required: true },
        supplierOrManufacturer: { type: Object },
        unitCost: { type: Number, required: true },
        totalPartCost: { type: Number, required: true },
      },
    ]),
  )
  parts: PartDetail[];

  @Prop({ type: String, required: true })
  currency: string;

  // @Prop({ type: MetaSchema, required: true })
  // meta: any;
}

export const BillOfMaterialsSchema =
  SchemaFactory.createForClass(BillOfMaterials);
