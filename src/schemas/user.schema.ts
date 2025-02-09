import { UserRole, UserStatus } from '@laminar-api/enums';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: String, required: true, unique: true, default: () => uuidv4() })
  id: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String })
  password?: string;

  @Prop({ type: [String], default: [] })
  refreshTokens: string[];

  @Prop({ type: String, enum: UserRole, default: UserRole.user })
  role: UserRole;

  @Prop({ type: String, enum: UserStatus, default: UserStatus.pending })
  status: UserStatus;

  //   @Prop({ type: MetaSchema, default: {} })
  //   meta: Meta;
}

export const UserSchema = SchemaFactory.createForClass(User);
