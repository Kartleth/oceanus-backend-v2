import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmpresaPersonalService } from './empresa_personal.service';
import { CreateEmpresaPersonalDto } from './dto/create-empresa_personal.dto';
import { UpdateEmpresaPersonalDto } from './dto/update-empresa_personal.dto';

@Controller('empresa-personal')
export class EmpresaPersonalController {
  constructor(private readonly empresaPersonalService: EmpresaPersonalService) {}

  @Post()
  create(@Body() createEmpresaPersonalDto: CreateEmpresaPersonalDto) {
    return this.empresaPersonalService.create(createEmpresaPersonalDto);
  }

  @Get()
  findAll() {
    return this.empresaPersonalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empresaPersonalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmpresaPersonalDto: UpdateEmpresaPersonalDto) {
    return this.empresaPersonalService.update(+id, updateEmpresaPersonalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empresaPersonalService.remove(+id);
  }
}
