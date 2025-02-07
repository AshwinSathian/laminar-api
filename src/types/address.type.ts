import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Address {
  @Field()
  addressLine1: string;

  @Field({ nullable: true })
  addressLine2?: string;

  @Field()
  townCity: string;

  @Field()
  stateProvinceCounty: string;

  @Field()
  country: string;

  @Field()
  postalZipCode: string;

  @Field({ nullable: true })
  mapsLink?: string;
}
