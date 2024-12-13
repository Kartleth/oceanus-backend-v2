import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormacademicaService } from './formacademica.service';
import { CreateFormacademicaDto } from './dto/create-formacademica.dto';
import { UpdateFormacademicaDto } from './dto/update-formacademica.dto';

@Controller('formacademica')
export class FormacademicaController {
  constructor(private readonly formacademicaService: FormacademicaService) {}

  // @Post()
  // create(@Body() createFormacademicaDto: CreateFormacademicaDto) {
  //   return this.formacademicaService.create(createFormacademicaDto);
  // }

  @Get()
  findAll() {
    return this.formacademicaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formacademicaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormacademicaDto: UpdateFormacademicaDto) {
    return this.formacademicaService.update(+id, updateFormacademicaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formacademicaService.remove(+id);
  }
}
