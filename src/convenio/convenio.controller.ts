import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ConvenioService } from './convenio.service';
import { CreateConvenioDto } from './dto/create-convenio.dto';
import { UpdateConvenioDto } from './dto/update-convenio.dto';

@Controller('convenio')
export class ConvenioController {
  constructor(private readonly convenioService: ConvenioService) {}

  @Post()
  create(@Body() createConvenioDto: CreateConvenioDto) {
    return this.convenioService.create(createConvenioDto);
  }

  @Get()
  findAll() {
    return this.convenioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.convenioService.findOne(+id);
  }

  // findAllByContractId
  @Get('contrato/:contractId')
  async findAllByContractId(@Param('contractId') contractId: string) {
    return await this.convenioService.findAllByContractId(+contractId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConvenioDto: UpdateConvenioDto,
  ) {
    return this.convenioService.update(+id, updateConvenioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.convenioService.remove(+id);
  }
}
