import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DocsubcontratadoService } from './docsubcontratado.service';
import { CreateDocsubcontratadoDto } from './dto/create-docsubcontratado.dto';
import { UpdateDocsubcontratadoDto } from './dto/update-docsubcontratado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subcontratado } from 'src/subcontratados/entities/subcontratado.entity';
import { Repository } from 'typeorm';
import { Docsubcontratado } from './entities/docsubcontratado.entity';

@Controller('docsubcontratado')
export class DocsubcontratadoController {
  constructor(
    private readonly docsubcontratadoService: DocsubcontratadoService,
    @InjectRepository(Docsubcontratado)
    private readonly docsubcontratadoRepository: Repository<Docsubcontratado>,
    @InjectRepository(Subcontratado)
    private readonly subcontratadoRepository: Repository<Subcontratado>,
  ) {}

  @Post()
  create(@Body() createDocsubcontratadoDto: CreateDocsubcontratadoDto) {
    return this.docsubcontratadoService.create(createDocsubcontratadoDto);
  }

  @Get()
  findAll() {
    return this.docsubcontratadoService.findAll();
  }

  //--------------------------------------------------------------------------------
  // Ruta para obtener la documentación de una persona por su id
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.docsubcontratadoService.findOne(+id);
  }
  // Fin de la ruta para obtener la documentación de una persona por su id
  //--------------------------------------------------------------------------------

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDocsubcontratadoDto: UpdateDocsubcontratadoDto,
  ) {
    return this.docsubcontratadoService.update(+id, updateDocsubcontratadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.docsubcontratadoService.remove(+id);
  }
}
