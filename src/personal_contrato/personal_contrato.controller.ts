import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonalContratoService } from './personal_contrato.service';
import { CreatePersonalContratoDto } from './dto/create-personal_contrato.dto';
import { UpdatePersonalContratoDto } from './dto/update-personal_contrato.dto';

@Controller('personal-contrato')
export class PersonalContratoController {
  constructor(private readonly personalContratoService: PersonalContratoService) {}

  @Post()
  create(@Body() createPersonalContratoDto: CreatePersonalContratoDto) {
    return this.personalContratoService.create(createPersonalContratoDto);
  }

  @Get()
  findAll() {
    return this.personalContratoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personalContratoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonalContratoDto: UpdatePersonalContratoDto) {
    return this.personalContratoService.update(+id, updatePersonalContratoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personalContratoService.remove(+id);
  }
}
