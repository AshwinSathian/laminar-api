import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { MetaSchema } from './common.schema';

export type MaterialDocument = HydratedDocument<Material>;

@Schema()
export class Material {
  @Prop({ type: String, required: true, unique: true })
  id: string;

  @Prop({ type: String, required: true })
  partName: string;

  @Prop({ type: [String], required: false })
  images?: string[];

  @Prop({ type: String, required: true })
  material: string;

  @Prop({ type: String, required: true })
  manufacturingMethod: string;

  @Prop({ type: [String], required: false })
  drawings?: string[];

  @Prop(
    raw({
      length: { type: String, required: true },
      breadth: { type: String, required: true },
      height: { type: String, required: true },
    }),
  )
  dimensions?: Record<string, any>;

  @Prop({ type: String, required: true })
  weight: string;

  @Prop({ type: [String], required: false })
  dataSheets?: string[];

  @Prop({ type: [String] })
  suppliers?: any[];

  // @Prop({ type: MetaSchema, required: true })
  // meta: any;
}

export const MaterialSchema = SchemaFactory.createForClass(Material);
