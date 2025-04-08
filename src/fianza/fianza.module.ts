import { Module } from '@nestjs/common';
import { FianzaService } from './fianza.service';
import { FianzaController } from './fianza.controller';
import { Fianza } from './entities/fianza.entity';
import { Contrato } from 'src/contrato/entities/contrato.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Fianza, Contrato])],
  providers: [FianzaService],
  controllers: [FianzaController],
  exports: [FianzaService],
})
export class FianzaModule {}
