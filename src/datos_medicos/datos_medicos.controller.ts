import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DatosMedicosService } from './datos_medicos.service';
import { CreateDatosMedicoDto } from './dto/create-datos_medico.dto';
import { UpdateDatosMedicoDto } from './dto/update-datos_medico.dto';

@Controller('datos-medicos')
export class DatosMedicosController {
  constructor(private readonly datosMedicosService: DatosMedicosService) {}

  @Post()
  create(@Body() createDatosMedicoDto: CreateDatosMedicoDto) {
    return this.datosMedicosService.create(createDatosMedicoDto);
  }

  @Get()
  findAll() {
    return this.datosMedicosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.datosMedicosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDatosMedicoDto: UpdateDatosMedicoDto) {
    return this.datosMedicosService.update(+id, updateDatosMedicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.datosMedicosService.remove(+id);
  }
}
