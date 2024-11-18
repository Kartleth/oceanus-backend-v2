import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubcontratadosService } from './subcontratados.service';
import { CreateSubcontratadoDto } from './dto/create-subcontratado.dto';
import { UpdateSubcontratadoDto } from './dto/update-subcontratado.dto';

@Controller('subcontratados')
export class SubcontratadosController {
  constructor(private readonly subcontratadosService: SubcontratadosService) {}

  @Post()
  create(@Body() createSubcontratadoDto: CreateSubcontratadoDto) {
    return this.subcontratadosService.create(createSubcontratadoDto);
  }

  @Get()
  findAll() {
    return this.subcontratadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subcontratadosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubcontratadoDto: UpdateSubcontratadoDto) {
    return this.subcontratadosService.update(+id, updateSubcontratadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subcontratadosService.remove(+id);
  }
}
