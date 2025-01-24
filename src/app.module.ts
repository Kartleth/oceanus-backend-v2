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
import { SubcontratadosModule } from './subcontratados/subcontratados.module';
import { OrdenServicioModule } from './orden_servicio/orden_servicio.module';
import { EmpresaPersonalModule } from './empresa_personal/empresa_personal.module';
import { FacturaModule } from './factura/factura.module';
import { PersonalContratoModule } from './personal_contrato/personal_contrato.module';
import { FormacademicaModule } from './formacademica/formacademica.module';
import { FamiliaresModule } from './familiares/familiares.module';
import { DatosMedicosModule } from './datos_medicos/datos_medicos.module';
import { DocumentacionModule } from './documentacion/documentacion.module';
import { DocsubcontratadoModule } from './docsubcontratado/docsubcontratado.module';

@Module({
  imports: [
    // Configurar el módulo de configuración
    ConfigModule.forRoot({
      isGlobal: true, // Hacer que las variables de entorno sean globales
    }),

    // Configurar el módulo TypeORM
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...connectionSource.options, // Usar las opciones generadas en connectionSource
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

    SubcontratadosModule,

    OrdenServicioModule,

    EmpresaPersonalModule,

    FacturaModule,

    PersonalContratoModule,

    FormacademicaModule,

    FamiliaresModule,

    DatosMedicosModule,

    DocumentacionModule,

    DocsubcontratadoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
