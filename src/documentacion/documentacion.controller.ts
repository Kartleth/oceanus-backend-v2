import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DocumentacionService } from './documentacion.service';
import { CreateDocumentacionDto } from './dto/create-documentacion.dto';
import { UpdateDocumentacionDto } from './dto/update-documentacion.dto';

@Controller('documentacion')
export class DocumentacionController {
  constructor(private readonly documentacionService: DocumentacionService) {}

  @Post()
  create(@Body() createDocumentacionDto: CreateDocumentacionDto) {
    return this.documentacionService.create(createDocumentacionDto);
  }

  @Get()
  findAll() {
    return this.documentacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDocumentacionDto: UpdateDocumentacionDto) {
    return this.documentacionService.update(+id, updateDocumentacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentacionService.remove(+id);
  }
}
