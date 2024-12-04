import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FormacademicaService } from './formacademica.service';
import { CreateFormacademicaDto } from './dto/create-formacademica.dto';
import { UpdateFormacademicaDto } from './dto/update-formacademica.dto';

@Controller('formacademica')
export class FormacademicaController {
  constructor(private readonly formacademicaService: FormacademicaService) {}

  @Post()
  async create(@Body() createFormacademicaDto: CreateFormacademicaDto) {
    return await this.formacademicaService.create(createFormacademicaDto);
  }

  @Get()
  async findAll() {
    return await this.formacademicaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.formacademicaService.findOne(+id);
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
