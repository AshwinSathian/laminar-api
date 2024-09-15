import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BomsService } from './boms.service';
import { CreateBomDto } from './dto/create-bom.dto';
import { UpdateBomDto } from './dto/update-bom.dto';

@ApiTags('BoMs')
@Controller('boms')
export class BomsController {
  constructor(private readonly bomsService: BomsService) {}

  @Post()
  create(@Body() createBomDto: CreateBomDto) {
    return this.bomsService.create(createBomDto);
  }

  @Get()
  findAll() {
    return this.bomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bomsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBomDto: UpdateBomDto) {
    return this.bomsService.update(+id, updateBomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bomsService.remove(+id);
  }
}
