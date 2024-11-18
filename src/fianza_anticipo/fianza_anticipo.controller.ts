import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FianzaAnticipoService } from './fianza_anticipo.service';
import { CreateFianzaAnticipoDto } from './dto/create-fianza_anticipo.dto';
import { UpdateFianzaAnticipoDto } from './dto/update-fianza_anticipo.dto';

@Controller('fianza-anticipo')
export class FianzaAnticipoController {
  constructor(private readonly fianzaAnticipoService: FianzaAnticipoService) {}

  @Post()
  create(@Body() createFianzaAnticipoDto: CreateFianzaAnticipoDto) {
    return this.fianzaAnticipoService.create(createFianzaAnticipoDto);
  }

  @Get()
  findAll() {
    return this.fianzaAnticipoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fianzaAnticipoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFianzaAnticipoDto: UpdateFianzaAnticipoDto) {
    return this.fianzaAnticipoService.update(+id, updateFianzaAnticipoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fianzaAnticipoService.remove(+id);
  }
}
