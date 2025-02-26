import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from '../cliente/cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from '../cliente/entities/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])],
  controllers: [ClienteController],
  providers: [ClienteService],
})
export class ClienteModule {}
