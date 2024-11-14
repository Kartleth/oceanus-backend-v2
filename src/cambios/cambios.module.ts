import { Module } from '@nestjs/common';
import { CambiosService } from './cambios.service';
import { CambiosController } from './cambios.controller';

@Module({
  controllers: [CambiosController],
  providers: [CambiosService],
})
export class CambiosModule {}
