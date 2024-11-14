import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CambiosService } from './cambios.service';
import { CreateCambioDto } from './dto/create-cambio.dto';
import { UpdateCambioDto } from './dto/update-cambio.dto';

@Controller('cambios')
export class CambiosController {
  constructor(private readonly cambiosService: CambiosService) {}

  @Post()
  create(@Body() createCambioDto: CreateCambioDto) {
    return this.cambiosService.create(createCambioDto);
  }

  @Get()
  findAll() {
    return this.cambiosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cambiosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCambioDto: UpdateCambioDto) {
    return this.cambiosService.update(+id, updateCambioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cambiosService.remove(+id);
  }
}
