import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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

  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async importSuppliers(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }
    return this.inventoryService.importInventories(file);
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
