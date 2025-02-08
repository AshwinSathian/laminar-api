import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AttachmentSchema } from './common.schema';
import { Supplier, SupplierEmbedSchema } from './supplier.schema';

export type MaterialDocument = HydratedDocument<Material>;

@Schema()
export class Material {
  @Prop({ type: String, required: true, unique: true })
  id: string;

  @Prop({ type: String, required: true })
  partName: string;

  @Prop({ type: [AttachmentSchema], required: false })
  images?: any[];

  @Prop({ type: String, required: true })
  material: string;

  @Prop({ type: String, required: true })
  manufacturingMethod: string;

  @Prop({ type: [AttachmentSchema], required: false })
  drawings?: any[];

  @Prop(
    raw({
      length: {
        value: { type: Number },
        unit: { type: String },
      },
      breadth: {
        value: { type: Number },
        unit: { type: String },
      },
      height: {
        value: { type: Number },
        unit: { type: String },
      },
    }),
  )
  dimensions?: Record<string, any>;

  @Prop(
    raw({
      value: { type: Number },
      unit: { type: String },
    }),
  )
  weight?: Record<string, any>;

  @Prop({ type: [AttachmentSchema], required: false })
  dataSheets?: any[];

  @Prop({ type: [SupplierEmbedSchema] })
  suppliers?: Supplier[];
}

export const MaterialSchema = SchemaFactory.createForClass(Material);

@Schema()
export class MaterialEmbed {
  @Prop({ type: String, required: true })
  id: string;

  @Prop({ type: String, required: true })
  partName: string;

  @Prop({ type: [AttachmentSchema], required: false })
  images?: any[];

  @Prop({ type: String, required: true })
  material: string;

  @Prop({ type: String, required: true })
  manufacturingMethod: string;

  @Prop({ type: [AttachmentSchema], required: false })
  drawings?: any[];

  @Prop(
    raw({
      length: {
        value: { type: Number },
        unit: { type: String },
      },
      breadth: {
        value: { type: Number },
        unit: { type: String },
      },
      height: {
        value: { type: Number },
        unit: { type: String },
      },
    }),
  )
  dimensions?: Record<string, any>;

  @Prop(
    raw({
      value: { type: Number },
      unit: { type: String },
    }),
  )
  weight?: Record<string, any>;

  @Prop({ type: [AttachmentSchema], required: false })
  dataSheets?: any[];
}

export const MaterialEmbedSchema = SchemaFactory.createForClass(MaterialEmbed);
