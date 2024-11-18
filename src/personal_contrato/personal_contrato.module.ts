import { Module } from '@nestjs/common';
import { PersonalContratoService } from './personal_contrato.service';
import { PersonalContratoController } from './personal_contrato.controller';

@Module({
  controllers: [PersonalContratoController],
  providers: [PersonalContratoService],
})
export class PersonalContratoModule {}
