import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { FianzaService } from './fianza.service';
import { CreateFianzaDto } from './dto/create-fianza.dto';
import { UpdateFianzaDto } from './dto/update-fianza.dto';
import { Fianza } from './entities/fianza.entity';

@Controller('fianza')
export class FianzaController {
  constructor(private readonly fianzaService: FianzaService) {}

  @Post('contrato/:idContrato')
  async crearFianza(
    @Param('idContrato') idContrato: number,
    @Body() datosFianza: CreateFianzaDto,
  ): Promise<Fianza> {
    return this.fianzaService.createFianza(idContrato, datosFianza);
  }

  @Get('contrato/:idContrato')
  async obtenerFianzasPorContrato(@Param('idContrato') idContrato: number) {
    return this.fianzaService.obtenerFianzasPorContrato(+idContrato);
  }

  //Lógica para fianza de anticipo

  @Post('contrato/:idContrato/fianza-anticipo')
  async createFianzaAnticipo(
    @Param('idContrato', ParseIntPipe) idContrato: number,
    @Body() createFianzaDto: CreateFianzaDto,
  ): Promise<Fianza> {
    return this.fianzaService.createFianzaAnticipo(idContrato, createFianzaDto);
  }

  @Get('contrato/:idContrato/fianza-anticipo')
  async getFianzasAnticipoByContrato(
    @Param('idContrato') idContrato: number,
  ): Promise<Fianza[]> {
    const fianzas = await this.fianzaService.obtenerFianzasAnticipo(idContrato);
    if (!fianzas) {
      throw new NotFoundException(
        'No se encontraron fianzas de anticipo para este contrato',
      );
    }
    return fianzas;
  }

  @Get('contrato/:idContrato/fianza-anticipo/:idFianza')
  async getFianzaAnticipoById(
    @Param('idContrato') idContrato: number,
    @Param('idFianza') idFianza: number,
  ): Promise<Fianza> {
    const fianza = await this.fianzaService.obtenerFianzaAnticipoPorId(
      idContrato,
      idFianza,
    );
    if (!fianza) {
      throw new NotFoundException(
        'No se encontró la fianza de anticipo con el ID proporcionado para este contrato',
      );
    }
    return fianza;
  }

  // Lógica para fianza de cumplimiento

  @Post('contrato/:idContrato/fianza-cumplimiento')
  async createFianzaCumplimiento(
    @Param('idContrato', ParseIntPipe) idContrato: number,
    @Body() createFianzaDto: CreateFianzaDto,
  ): Promise<Fianza> {
    return this.fianzaService.createFianzaCumplimiento(
      idContrato,
      createFianzaDto,
    );
  }

  @Get('contrato/:idContrato/fianza-cumplimiento')
  async getFianzasCumplimientoByContrato(
    @Param('idContrato') idContrato: number,
  ): Promise<Fianza[]> {
    const fianzas =
      await this.fianzaService.obtenerFianzasCumplimiento(idContrato);
    if (!fianzas) {
      throw new NotFoundException(
        'No se encontraron fianzas de cumplimiento para este contrato',
      );
    }
    return fianzas;
  }

  @Get('contrato/:idContrato/fianza-cumplimiento/:idFianza')
  async getFianzaCumplimientoById(
    @Param('idContrato') idContrato: number,
    @Param('idFianza') idFianza: number,
  ): Promise<Fianza> {
    const fianza = await this.fianzaService.obtenerFianzaCumplimientoPorId(
      idContrato,
      idFianza,
    );
    if (!fianza) {
      throw new NotFoundException(
        'No se encontró la fianza de cumplimiento con el ID proporcionado para este contrato',
      );
    }
    return fianza;
  }

  // Lógica para fianza de oculto

  @Post('contrato/:idContrato/fianza-oculto')
  async createFianzaOculto(
    @Param('idContrato', ParseIntPipe) idContrato: number,
    @Body() createFianzaDto: CreateFianzaDto,
  ): Promise<Fianza> {
    return this.fianzaService.createFianzaOculto(idContrato, createFianzaDto);
  }

  @Get('contrato/:idContrato/fianza-oculto')
  async getFianzasOcultoByContrato(
    @Param('idContrato') idContrato: number,
  ): Promise<Fianza[]> {
    const fianzas = await this.fianzaService.obtenerFianzasOculto(idContrato);
    if (!fianzas) {
      throw new NotFoundException(
        'No se encontraron fianzas oculto para este contrato',
      );
    }
    return fianzas;
  }

  @Get('contrato/:idContrato/fianza-oculto/:idFianza')
  async getFianzaOcultoById(
    @Param('idContrato') idContrato: number,
    @Param('idFianza') idFianza: number,
  ): Promise<Fianza> {
    const fianza = await this.fianzaService.obtenerFianzaOcultoPorId(
      idContrato,
      idFianza,
    );
    if (!fianza) {
      throw new NotFoundException(
        'No se encontró la fianza Oculto con el ID proporcionado para este contrato',
      );
    }
    return fianza;
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
