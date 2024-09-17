import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class PartDetailDTO {
  @ApiProperty()
  @IsString()
  partNumber: string;

  @ApiProperty()
  @IsString()
  partName: string;

  @ApiProperty()
  @IsString()
  materialId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true }) // Ensures each item in the array is a string
  partImages?: string[];

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsString()
  units: string;

  @ApiProperty()
  @IsArray()
  supplierOrManufacturer?: any;

  @ApiProperty()
  @IsNumber()
  unitCost: number;

  @ApiProperty()
  @IsNumber()
  totalPartCost: number;
}

export class CreateBillOfMaterialsDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty()
  @IsString()
  productName: string;

  @ApiProperty()
  @IsString()
  contactInfo: string;

  @ApiProperty()
  @IsString()
  approvedBy: string;

  @ApiProperty()
  @IsDate()
  dateOfApproval: Date;

  @ApiProperty()
  @IsNumber()
  partCount: number;

  @ApiProperty()
  @IsNumber()
  totalCost: number;

  @ApiProperty({ type: [PartDetailDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PartDetailDTO)
  parts: PartDetailDTO[];

  @ApiProperty()
  @IsString()
  currency: string;
}
