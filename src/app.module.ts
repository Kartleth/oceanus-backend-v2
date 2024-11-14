// src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { connectionSource } from './config/typeorm';
import { CambiosModule } from './cambios/cambios.module';

@Module({
  imports: [
    // Configurar el módulo de configuración
    ConfigModule.forRoot({
      isGlobal: true,  // Hacer que las variables de entorno sean globales
    }),

    // Configurar el módulo TypeORM
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...connectionSource.options,  // Usar las opciones generadas en connectionSource
      }),
    }),

    CambiosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
