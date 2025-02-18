import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { EmpresaService } from './cliente.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Controller('empresa')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Post()
  create(@Body() createEmpresaDto: CreateEmpresaDto) {
    console.log('Datos recibidos:', createEmpresaDto);
    return this.empresaService.create(createEmpresaDto);
  }

  @Get()
  findAll() {
    return this.empresaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empresaService.findOne(+id);
  }

  //@Patch(':id')
  //update(@Param('id') id: string, @Body() updateEmpresaDto: UpdateEmpresaDto) {
  //  return this.empresaService.update(+id, updateEmpresaDto);
  //}

  @Delete(':id')
  async remove(@Param('id') id: string) {
    console.log(id);
    return await this.empresaService.remove(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEmpresaDto: UpdateEmpresaDto,
  ) {
    console.log(updateEmpresaDto);
    return await this.empresaService.update(+id, updateEmpresaDto);
  }
}
