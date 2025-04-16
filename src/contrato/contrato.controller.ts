import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  HttpException,
  HttpStatus,
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
  async updateContrato(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateContratoDto,
  ) {
    return this.contratoService.editar(id, data);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.contratoService.remove(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al eliminar el contrato',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
