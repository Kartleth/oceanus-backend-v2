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
  UseGuards,
} from '@nestjs/common';
import { PersonasService } from './personas.service';
import { CreatePersonaDatosCompletosDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { DatosMedicosService } from 'src/datos_medicos/datos_medicos.service';
import { FormacademicaService } from 'src/formacademica/formacademica.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
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
    data: CreatePersonaDatosCompletosDto,
  ) {
    console.log(data);
    const transpersona = {
      ...data.datosPersonales,
      datosMedicos: data.datosMedicos,
      datosAcademicos: data.datosAcademicos,
    };
    console.log('transpersona', transpersona);
    const persona = await this.personasService.create(transpersona);
    if (!persona) {
      throw new HttpException('error.', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return { message: 'Se creo exitosamente.' };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
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
