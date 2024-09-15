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
import { CreateMaterialDTO } from './dto/create-material.dto';
import { UpdateMaterialDTO } from './dto/update-material.dto';
import { MaterialsService } from './materials.service';

@ApiTags('Materials')
@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Post()
  @ApiBody({ type: CreateMaterialDTO })
  create(@Body() createMaterialDto: CreateMaterialDTO) {
    return this.materialsService.create(createMaterialDto);
  }

  @Get()
  async findAll() {
    return this.materialsService.findAll();
  }

  @Get('supplier/:id')
  async findSupplierMaterials(@Param('id') id: string) {
    return this.materialsService.findSupplierMaterials(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.materialsService.findOne(id);
  }

  @Put(':id')
  @ApiBody({ type: UpdateMaterialDTO })
  update(
    @Param('id') id: string,
    @Body() updateMaterialDto: UpdateMaterialDTO,
  ) {
    return this.materialsService.update(id, updateMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialsService.remove(id);
  }
}
