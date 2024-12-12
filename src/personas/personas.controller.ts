import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PersonasService } from './personas.service';
import { CreatePersona, CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { CreateDatosMedicoDto } from 'src/datos_medicos/dto/create-datos_medico.dto';
import { CreateFormacademicaDto } from 'src/formacademica/dto/create-formacademica.dto';

@Controller('personas')
export class PersonasController {
  constructor(private readonly personasService: PersonasService) {}

  @Post()
  create(
    @Body()
    data: CreatePersona,
  ) {
    console.log(data);

    return this.personasService.create(data.datosPersonales);
  }

  @Get()
  findAll() {
    return this.personasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonaDto: UpdatePersonaDto) {
    return this.personasService.update(+id, updatePersonaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personasService.remove(+id);
  }
}
