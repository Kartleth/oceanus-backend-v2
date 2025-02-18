import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-empresa.dto';
import { UpdateClienteDto } from './dto/update-empresa.dto';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly ClienteService: ClienteService) {}

  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    console.log('Datos recibidos:', createClienteDto);
    return this.ClienteService.create(createClienteDto);
  }

  @Get()
  findAll() {
    return this.ClienteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ClienteService.findOne(+id);
  }

  //@Patch(':id')
  //update(@Param('id') id: string, @Body() updateEmpresaDto: UpdateEmpresaDto) {
  //  return this.empresaService.update(+id, updateEmpresaDto);
  //}

  @Delete(':id')
  async remove(@Param('id') id: string) {
    console.log(id);
    return await this.ClienteService.remove(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClienteDto: UpdateClienteDto,
  ) {
    console.log(updateClienteDto);
    return await this.ClienteService.update(+id, updateClienteDto);
  }
}
