import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MetaSchema } from './common.schema';

export type SupplierDocument = HydratedDocument<Supplier>;

@Schema()
export class Supplier {
  @Prop({ type: String, required: true, unique: true })
  id: string;

  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop(
    raw({
      name: { type: String, required: true },
      email: { type: String, required: true },
      designation: { type: String },
      phone: {
        code: { type: String, required: true },
        number: { type: String, required: true },
      },
    }),
  )
  primaryContact: any;

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
  website: string;

  @Prop({ type: Array })
  documents: any[];

  // @Prop({ type: MetaSchema, required: true })
  // meta: any;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);
