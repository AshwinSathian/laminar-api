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
    const materials = await this.materialsService.findAll();
    for await (const material of materials || []) {
      if (material.suppliers && Array.isArray(material.suppliers)) {
        const supplierIds = material.suppliers;
        const supplierObjects = await this.materialsService.loadSuppliers(
          supplierIds,
        );
        material.suppliers = supplierObjects?.map((s) => s.name);
      }
    }

    return materials;
  }

  @Get('supplier/:id')
  async findSupplierMaterials(@Param('id') id: string) {
    const materials = await this.materialsService.findSupplierMaterials(id);
    for await (const material of materials || []) {
      if (material.suppliers && Array.isArray(material.suppliers)) {
        const supplierIds = material.suppliers;
        const supplierObjects = await this.materialsService.loadSuppliers(
          supplierIds,
        );
        material.suppliers = supplierObjects?.map((s) => s.name);
      }
    }

    return materials;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const material = await this.materialsService.findOne(id);
    if (material.suppliers && Array.isArray(material.suppliers)) {
      const supplierIds = material.suppliers;
      const supplierObjects = await this.materialsService.loadSuppliers(
        supplierIds,
      );
      material.suppliers = supplierObjects?.map((s) => s.name);
    }

    return material;
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
