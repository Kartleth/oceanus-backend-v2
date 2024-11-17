import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FianzaCumplimientoService } from './fianza_cumplimiento.service';
import { CreateFianzaCumplimientoDto } from './dto/create-fianza_cumplimiento.dto';
import { UpdateFianzaCumplimientoDto } from './dto/update-fianza_cumplimiento.dto';

@Controller('fianza-cumplimiento')
export class FianzaCumplimientoController {
  constructor(private readonly fianzaCumplimientoService: FianzaCumplimientoService) {}

  @Post()
  create(@Body() createFianzaCumplimientoDto: CreateFianzaCumplimientoDto) {
    return this.fianzaCumplimientoService.create(createFianzaCumplimientoDto);
  }

  @Get()
  findAll() {
    return this.fianzaCumplimientoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fianzaCumplimientoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFianzaCumplimientoDto: UpdateFianzaCumplimientoDto) {
    return this.fianzaCumplimientoService.update(+id, updateFianzaCumplimientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fianzaCumplimientoService.remove(+id);
  }
}
