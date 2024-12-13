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
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';

@Controller('personas')
export class PersonasController {
  constructor(private readonly personasService: PersonasService) {}

  @Post()
  create(@Body() createPersonaDto: CreatePersonaDto) {
    return this.personasService.create(createPersonaDto);
  }

  @Get()
  findAll() {
    return this.personasService.findAll({
      relations: ['formacademica', 'datosmedico'], //ando viendo si sí esta bien hacer esto jeasjdh
    });
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
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    await this.personasService.remove(id);
    return { message: `Persona con id ${id} eliminada exitosamente` };
  }
}
