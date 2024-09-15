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
import { CreateInventoryDTO } from './dto/create-inventory.dto';
import { UpdateInventoryDTO } from './dto/update-inventory.dto';
import { InventoryService } from './inventory.service';

@ApiTags('Inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  @ApiBody({ type: CreateInventoryDTO })
  create(@Body() CreateInventoryDTO: CreateInventoryDTO) {
    return this.inventoryService.create(CreateInventoryDTO);
  }

  @Get()
  findAll() {
    return this.inventoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryService.findOne(id);
  }

  @Put(':id')
  @ApiBody({ type: UpdateInventoryDTO })
  update(
    @Param('id') id: string,
    @Body() UpdateInventoryDTO: UpdateInventoryDTO,
  ) {
    return this.inventoryService.update(id, UpdateInventoryDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryService.remove(id);
  }
}
