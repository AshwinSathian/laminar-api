import { OrderStatus } from '@laminar-api/enums';
import { Material, Supplier } from '@laminar-api/interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateMaterialDTO } from 'src/materials/dto/create-material.dto';
import { CreateSupplierDTO } from 'src/suppliers/dto/create-supplier.dto';

class OrderItemDTO {
  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateMaterialDTO)
  part: Material;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  unitPrice: number;
}

export class CreateOrderDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDTO)
  parts: OrderItemDTO[];

  @ApiProperty()
  @Type(() => CreateSupplierDTO)
  supplier: Supplier;

  @ApiProperty()
  @IsDateString()
  orderDate: Date;

  @ApiProperty()
  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

  @ApiProperty()
  @IsString()
  @IsOptional()
  invoice?: string;
}
