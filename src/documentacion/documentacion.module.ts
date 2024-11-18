import { Module } from '@nestjs/common';
import { DocumentacionService } from './documentacion.service';
import { DocumentacionController } from './documentacion.controller';

@Module({
  controllers: [DocumentacionController],
  providers: [DocumentacionService],
})
export class DocumentacionModule {}
