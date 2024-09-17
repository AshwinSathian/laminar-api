import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { BillOfMaterialsService } from './bill-of-materials.service';
import { CreateBillOfMaterialsDTO } from './dto/create-bill-of-materials.dto';
import { UpdateBillOfMaterialsDTO } from './dto/update-bill-of-materials.dto';

@ApiTags('Bill Of Materials')
@Controller('bill-of-materials')
export class BillOfMaterialsController {
  constructor(
    private readonly billofmaterialsService: BillOfMaterialsService,
  ) {}

  @Post()
  @ApiBody({ type: CreateBillOfMaterialsDTO })
  create(@Body() createBillOfMaterialsDTO: CreateBillOfMaterialsDTO) {
    return this.billofmaterialsService.create(createBillOfMaterialsDTO);
  }

  @Get()
  findAll() {
    return this.billofmaterialsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billofmaterialsService.findOne(id);
  }

  @Put(':id')
  @ApiBody({ type: UpdateBillOfMaterialsDTO })
  update(
    @Param('id') id: string,
    @Body() updateBillOfMaterialsDTO: UpdateBillOfMaterialsDTO,
  ) {
    return this.billofmaterialsService.update(id, updateBillOfMaterialsDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billofmaterialsService.remove(id);
  }
}
