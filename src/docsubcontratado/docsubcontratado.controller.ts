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

  //--------------------------------------------------------------------------------
  // Ruta para obtener la documentación de una persona por su id
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.docsubcontratadoService.findOne(+id);
  }
  // Fin de la ruta para obtener la documentación de una persona por su id
  //--------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------
  // Ruta para obtener la documentación de un subcontratdo por el documentKey
  @Get(':subcontratadoId/getDoc/:documentKey')
  async getDocument(
    @Param('subcontratadoId') subcontratadoId: number,
    @Param('documentKey') documentKey: string,
  ) {
    try {
      const validDocumentKeys = ['rfc', 'nss', 'ine', 'curp', 'foto'];

      if (!validDocumentKeys.includes(documentKey)) {
        throw new Error('DocumentKey no válido');
      }

      const subcontratado = await this.subcontratadoRepository.findOne({
        where: { idsubcontratado: subcontratadoId },
      });

      if (!subcontratado) {
        throw new Error('Subcontratado no encontrado');
      }

      const docsubcontratado = await this.docsubcontratadoRepository.findOne({
        where: { subcontratado: subcontratado },
      });

      if (!docsubcontratado) {
        throw new Error('No se encontró documentación para este subcontratado');
      }

      const documentPath = docsubcontratado[documentKey];

      if (!documentPath) {
        throw new Error(`No se encontró el archivo para "${documentKey}"`);
      }

      const fileUrl = `http://localhost:3001/uploadsSubcontratados/${documentPath}`;
      return { message: 'Archivo encontrado', fileUrl };
    } catch (error) {
      console.error('Error al obtener el documento:', error);
      return { message: 'Error al obtener el documento', error: error.message };
    }
  }

  //--------------------------------------------------------------------------------
}
