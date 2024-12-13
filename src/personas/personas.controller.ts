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

    const persona = await this.personasService.create(data.datosPersonales);
    if (!persona) {
      throw new HttpException('error.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const datosMedicos = await this.medicosService.create(
      data.datosMedicos,
      persona,
    );
    if (!datosMedicos) {
      throw new HttpException('error.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const datosAcademicos = await this.academicoService.create(
      data.datosAcademicos,
      persona,
    );
    if (!datosAcademicos) {
      throw new HttpException('error.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return { message: 'Se creo exitosamente.' };
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
