import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class DimensionValueDTO {
  @ApiProperty()
  @IsNumber()
  value: number;

  @ApiProperty()
  @IsString()
  unit: string;
}

class DimensionsDTO {
  @ApiProperty({ type: DimensionValueDTO })
  @IsObject()
  @ValidateNested()
  @Type(() => DimensionValueDTO)
  length: DimensionValueDTO;

  @ApiProperty({ type: DimensionValueDTO })
  @IsObject()
  @ValidateNested()
  @Type(() => DimensionValueDTO)
  breadth: DimensionValueDTO;

  @ApiProperty({ type: DimensionValueDTO })
  @IsObject()
  @ValidateNested()
  @Type(() => DimensionValueDTO)
  height: DimensionValueDTO;
}

class WeightDTO {
  @ApiProperty()
  @IsNumber()
  value: number;

  @ApiProperty()
  @IsString()
  unit: string;
}

export class CreateMaterialDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty()
  @IsString()
  partName: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ApiProperty()
  @IsString()
  material: string;

  @ApiProperty()
  @IsString()
  manufacturingMethod: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  drawings?: string[];

  @ApiProperty({ type: DimensionsDTO })
  @IsOptional()
  @ValidateNested()
  @Type(() => DimensionsDTO)
  dimensions?: DimensionsDTO;

  @ApiProperty({ type: WeightDTO })
  @IsOptional()
  @ValidateNested()
  @Type(() => WeightDTO)
  weight?: WeightDTO;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  dataSheets?: string[];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  suppliers?: any[];
}
