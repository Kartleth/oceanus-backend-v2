import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { SubcontratadosService } from './subcontratados.service';
import { CreateSubcontratadoDto } from './dto/create-subcontratado.dto';
import { UpdateSubcontratadoDto } from './dto/update-subcontratado.dto';
import { CreateDocsubcontratadoDto } from 'src/docsubcontratado/dto/create-docsubcontratado.dto';

@Controller('subcontratados')
export class SubcontratadosController {
  constructor(private readonly subcontratadosService: SubcontratadosService) {}

  @Post()
  create(@Body() createSubcontratadoDto: CreateSubcontratadoDto) {
    return this.subcontratadosService.create(createSubcontratadoDto);
  }

  @Post(':id/documento')
  async addDocumento(
    @Param('id') id: number,
    @Body() createDocsubcontratadoDto: CreateDocsubcontratadoDto,
  ) {
    return await this.subcontratadosService.addDocumentoSubcontratado(
      id,
      createDocsubcontratadoDto,
    );
  }

  @Get()
  findAll() {
    return this.subcontratadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subcontratadosService.findOne(+id);
  }

  //@Patch(':id')
  //update(
  //  @Param('id') id: string,
  //  @Body() updateSubcontratadoDto: UpdateSubcontratadoDto,
  //) {
  //  return this.subcontratadosService.update(+id, updateSubcontratadoDto);
  //}

  @Delete(':id')
  async remove(@Param('id') id: string) {
    console.log(id);
    return await this.subcontratadosService.remove(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSubcontratadoDto: UpdateSubcontratadoDto,
  ) {
    return await this.subcontratadosService.update(+id, updateSubcontratadoDto);
  }
}
