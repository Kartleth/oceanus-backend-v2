import { Module } from '@nestjs/common';
import { EmpresaPersonalService } from './empresa_personal.service';
import { EmpresaPersonalController } from './empresa_personal.controller';

@Module({
  controllers: [EmpresaPersonalController],
  providers: [EmpresaPersonalService],
})
export class EmpresaPersonalModule {}
