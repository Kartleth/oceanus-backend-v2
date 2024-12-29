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
import { FormacademicaService } from './formacademica.service';
import { CreateFormacademicaDto } from './dto/create-formacademica.dto';
import { UpdateFormacademicaDto } from './dto/update-formacademica.dto';

@Controller('formacademica')
export class FormacademicaController {
  constructor(private readonly formacademicaService: FormacademicaService) {}

  @Post()
  async create(@Body() data: CreateFormacademicaDto) {
    try {
      const formAcademica = await this.formacademicaService.create(data);
      if (!formAcademica) {
        throw new HttpException(
          'No se pudo crear la información académica.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return {
        message: 'Se creó la información académica exitosamente.',
        data: formAcademica,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al crear la información académica.',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const formAcademicas = await this.formacademicaService.findAll();
      if (!formAcademicas.length) {
        throw new HttpException(
          'No se encontraron registros de formación académica.',
          HttpStatus.NOT_FOUND,
        );
      }
      return formAcademicas;
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
      const formAcademica = await this.formacademicaService.findOne(+id);
      if (!formAcademica) {
        throw new HttpException(
          `No se encontró una formación académica con el ID ${id}.`,
          HttpStatus.NOT_FOUND,
        );
      }
      return formAcademica;
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al recuperar los datos.',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFormacademicaDto: UpdateFormacademicaDto,
  ) {
    return await this.formacademicaService.update(+id, updateFormacademicaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.formacademicaService.remove(+id);
  }
}
