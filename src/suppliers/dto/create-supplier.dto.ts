import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

class PhoneDTO {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  number: string;
}

class PrimaryContactDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  designation?: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => PhoneDTO)
  phone: PhoneDTO;
}

class AddressDTO {
  @ApiProperty()
  @IsString()
  addressLine1: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  addressLine2?: string;

  @ApiProperty()
  @IsString()
  townCity: string;

  @ApiProperty()
  @IsString()
  stateProvinceCounty: string;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsString()
  postalZipCode: string;

  @ApiProperty()
  @IsString()
  mapsLink?: string;
}

export class CreateSupplierDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => PrimaryContactDTO)
  primaryContact: PrimaryContactDTO;

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDTO)
  address?: AddressDTO;

  @ApiProperty()
  @IsOptional()
  @IsString()
  website?: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  documents?: any[];
}
