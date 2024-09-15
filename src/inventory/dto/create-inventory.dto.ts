import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

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
  @IsOptional()
  @IsString()
  mapsLink?: string;
}

export class CreateInventoryDTO {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  itemId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDTO)
  address?: AddressDTO;

  @ApiProperty()
  @IsOptional()
  @IsString()
  notes?: string;
}
