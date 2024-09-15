import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

class DimensionsDTO {
  @ApiProperty()
  @IsString()
  length: string;

  @ApiProperty()
  @IsString()
  breadth: string;

  @ApiProperty()
  @IsString()
  height: string;
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

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => DimensionsDTO)
  dimensions?: DimensionsDTO;

  @ApiProperty()
  @IsString()
  weight: string;

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
