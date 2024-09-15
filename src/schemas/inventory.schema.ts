import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MetaSchema } from './common.schema';

export type InventoryDocument = HydratedDocument<Inventory>;

@Schema()
export class Inventory {
  @Prop({ type: String, required: true, unique: true })
  id: string;

  @Prop({ type: String, required: true, unique: true })
  itemId: string;

  @Prop({ type: String })
  description: string;

  @Prop(
    raw({
      addressLine1: { type: String, required: true },
      addressLine2: { type: String },
      townCity: { type: String, required: true },
      stateProvinceCounty: { type: String, required: true },
      country: { type: String, required: true },
      postalZipCode: { type: String, required: true },
      mapsLink: { type: String },
    }),
  )
  address?: any;

  @Prop({ type: String })
  notes: string;

  // @Prop({ type: MetaSchema, required: true })
  // meta: any;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
