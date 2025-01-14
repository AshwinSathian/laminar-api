import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MetaDocument = HydratedDocument<Meta>;

@Schema({ _id: false })
class UserPersona {
  @Prop({ type: String, required: true })
  id: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  image: string;
}

export const UserPersonaSchema = SchemaFactory.createForClass(UserPersona);

@Schema({ _id: false })
class OrgPersona {
  @Prop({ type: String, required: true })
  id: string;

  @Prop({ type: String, required: true })
  name: string;
}

export const OrgPersonaSchema = SchemaFactory.createForClass(OrgPersona);

@Schema({ _id: false })
class Attachment {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: String, required: true })
  url: string;
}

export const AttachmentSchema = SchemaFactory.createForClass(Attachment);

@Schema()
export class Meta {
  @Prop({ type: UserPersonaSchema, required: true })
  createdBy: UserPersona;

  @Prop({ type: UserPersonaSchema, required: true })
  updatedBy: UserPersona;

  @Prop({ type: Date, required: true })
  createdDate: Date;

  @Prop({ type: Date, required: true })
  updatedDate: Date;

  @Prop({ type: OrgPersonaSchema, required: true })
  orgInfo: OrgPersona;
}

export const MetaSchema = SchemaFactory.createForClass(Meta);
