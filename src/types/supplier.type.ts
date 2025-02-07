import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Address } from './address.type';
import { Attachment } from './attachment.type';
import { PrimaryContact } from './primary-contact.type';

@ObjectType()
export class Supplier {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => PrimaryContact)
  primaryContact: PrimaryContact;

  @Field(() => Address, { nullable: true })
  address?: Address;

  @Field()
  website: string;

  @Field(() => [Attachment], { nullable: true })
  documents?: Attachment[];
}
