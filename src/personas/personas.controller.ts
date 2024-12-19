import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PersonasService } from './personas.service';
import { CreatePersona, CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { CreateDatosMedicoDto } from 'src/datos_medicos/dto/create-datos_medico.dto';
import { CreateFormacademicaDto } from 'src/formacademica/dto/create-formacademica.dto';
import { DatosMedicosService } from 'src/datos_medicos/datos_medicos.service';
import { FormacademicaService } from 'src/formacademica/formacademica.service';

@Controller('personas')
export class PersonasController {
  constructor(
    private readonly personasService: PersonasService,
    private readonly medicosService: DatosMedicosService,
    private readonly academicoService: FormacademicaService,
  ) {}

  @Post()
  async create(
    @Body()
    data: CreatePersona,
  ) {
    console.log(data);
    const transpersona = {
      ...data.datosPersonales,
      datosMedicos: data.datosMedicos,
      datosAcademicos: data.datosAcademicos,
    };
    const persona = await this.personasService.create(transpersona);
    if (!persona) {
      throw new HttpException('error.', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return { message: 'Se creo exitosamente.' };
  }

  @Get()
  async findAll() {
    return await this.personasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.personasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonaDto: UpdatePersonaDto) {
    return this.personasService.update(+id, updatePersonaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    console.log(id);
    return await this.personasService.remove(+id);
  }
}
