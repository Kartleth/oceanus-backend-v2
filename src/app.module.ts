// src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { connectionSource } from './config/typeorm';
import { CambiosModule } from './cambios/cambios.module';
import { ContratoModule } from './contrato/contrato.module';
import { ConvenioModule } from './convenio/convenio.module';
import { PersonasModule } from './personas/personas.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { EmpresaModule } from './empresa/empresa.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';
import { FianzaModule } from './fianza/fianza.module';
import { FianzaAnticipoModule } from './fianza_anticipo/fianza_anticipo.module';
import { FianzaCumplimientoModule } from './fianza_cumplimiento/fianza_cumplimiento.module';
import { FianzaViciosOcultosModule } from './fianza_vicios_ocultos/fianza_vicios_ocultos.module';

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

    ContratoModule,

    ConvenioModule,

    PersonasModule,

    UsuariosModule,

    EmpresaModule,

    NotificacionesModule,

    FianzaModule,

    FianzaAnticipoModule,

    FianzaCumplimientoModule,

    FianzaViciosOcultosModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
