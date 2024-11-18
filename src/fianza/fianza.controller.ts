import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FianzaService } from './fianza.service';
import { CreateFianzaDto } from './dto/create-fianza.dto';
import { UpdateFianzaDto } from './dto/update-fianza.dto';

@Controller('fianza')
export class FianzaController {
  constructor(private readonly fianzaService: FianzaService) {}

  @Post()
  create(@Body() createFianzaDto: CreateFianzaDto) {
    return this.fianzaService.create(createFianzaDto);
  }

  @Get()
  findAll() {
    return this.fianzaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fianzaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFianzaDto: UpdateFianzaDto) {
    return this.fianzaService.update(+id, updateFianzaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fianzaService.remove(+id);
  }
}
