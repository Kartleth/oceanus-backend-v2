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
import { DatosMedicosService } from './datos_medicos.service';
import { CreateDatosMedicoDto } from './dto/create-datos_medico.dto';
import { UpdateDatosMedicoDto } from './dto/update-datos_medico.dto';

@Controller('datos-medicos')
export class DatosMedicosController {
  constructor(private readonly datosMedicosService: DatosMedicosService) {}

  @Post()
  async create(@Body() data: CreateDatosMedicoDto) {
    try {
      const DatosMedico = await this.datosMedicosService.create(data);
      if (!DatosMedico) {
        throw new HttpException(
          'No se pudo crear la información medica.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return {
        message: 'Se creó la información medica exitosamente.',
        data: DatosMedico,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al crear la información medica.',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const DatosMedico = await this.datosMedicosService.findAll();
      if (!DatosMedico.length) {
        throw new HttpException(
          'No se encontraron registros de datos medicos.',
          HttpStatus.NOT_FOUND,
        );
      }
      return DatosMedico;
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al recuperar los datos.',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const DatosMedico = await this.datosMedicosService.findOne(+id);
      if (!DatosMedico) {
        throw new HttpException(
          `No se encontró una datos medicos con el ID ${id}.`,
          HttpStatus.NOT_FOUND,
        );
      }
      return DatosMedico;
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al recuperar los datos.',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDatosMedicoDto: UpdateDatosMedicoDto,
  ) {
    return this.datosMedicosService.update(+id, updateDatosMedicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.datosMedicosService.remove(+id);
  }
}
