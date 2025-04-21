import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ContratoService } from './contrato.service';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('contrato')
export class ContratoController {
  constructor(private readonly contratoService: ContratoService) {}

  @Post()
  async create(@Body() createContratoDto: CreateContratoDto) {
    console.log('ContratoController => create => data =>', createContratoDto);

    return this.contratoService.create(createContratoDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return await this.contratoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.contratoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContratoDto: UpdateContratoDto,
  ) {
    return this.contratoService.update(+id, updateContratoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log(id);
    return this.contratoService.remove(+id);
  }
}
