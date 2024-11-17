import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FianzaViciosOcultosService } from './fianza_vicios_ocultos.service';
import { CreateFianzaViciosOcultoDto } from './dto/create-fianza_vicios_oculto.dto';
import { UpdateFianzaViciosOcultoDto } from './dto/update-fianza_vicios_oculto.dto';

@Controller('fianza-vicios-ocultos')
export class FianzaViciosOcultosController {
  constructor(private readonly fianzaViciosOcultosService: FianzaViciosOcultosService) {}

  @Post()
  create(@Body() createFianzaViciosOcultoDto: CreateFianzaViciosOcultoDto) {
    return this.fianzaViciosOcultosService.create(createFianzaViciosOcultoDto);
  }

  @Get()
  findAll() {
    return this.fianzaViciosOcultosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fianzaViciosOcultosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFianzaViciosOcultoDto: UpdateFianzaViciosOcultoDto) {
    return this.fianzaViciosOcultosService.update(+id, updateFianzaViciosOcultoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fianzaViciosOcultosService.remove(+id);
  }
}
