import { Module } from '@nestjs/common';
import { FormacademicaService } from './formacademica.service';
import { FormacademicaController } from './formacademica.controller';

@Module({
  controllers: [FormacademicaController],
  providers: [FormacademicaService],
})
export class FormacademicaModule {}
