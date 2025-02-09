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

class AttachmentDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsString()
  url: string;
}

export class PartDetailDTO {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  partNumber: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: [AttachmentDTO], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttachmentDTO)
  images?: AttachmentDTO[];

  @ApiProperty()
  @IsString()
  material: string;

  @ApiProperty()
  @IsString()
  manufacturingMethod: string;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsOptional()
  nonLinrary?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  supplierOrManufacturer?: { id: string; name: string };

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
