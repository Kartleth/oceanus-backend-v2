import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DocsubcontratadoService } from './docsubcontratado.service';
import { CreateDocsubcontratadoDto } from './dto/create-docsubcontratado.dto';
import { UpdateDocsubcontratadoDto } from './dto/update-docsubcontratado.dto';

@Controller('docsubcontratado')
export class DocsubcontratadoController {
  constructor(private readonly docsubcontratadoService: DocsubcontratadoService) {}

  @Post()
  create(@Body() createDocsubcontratadoDto: CreateDocsubcontratadoDto) {
    return this.docsubcontratadoService.create(createDocsubcontratadoDto);
  }

  @Get()
  findAll() {
    return this.docsubcontratadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.docsubcontratadoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDocsubcontratadoDto: UpdateDocsubcontratadoDto) {
    return this.docsubcontratadoService.update(+id, updateDocsubcontratadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.docsubcontratadoService.remove(+id);
  }
}
