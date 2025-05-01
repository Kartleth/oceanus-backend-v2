// src/config/typeorm.ts

import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

// Cargar las variables de entorno desde el archivo .env
dotenvConfig({ path: '.env' });

const typeOrmConfig: DataSourceOptions = {
  type: 'postgres', // Tipo de base de datos
  host: process.env.DATABASE_HOST || 'localhost', // Host de la base de datos
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432, // Puerto de la base de datos
  username: process.env.DATABASE_USERNAME || 'postgres', // Usuario
  password: process.env.DATABASE_PASSWORD || 'ilseespinoza2708', // Contraseña
  database: process.env.DATABASE_NAME || 'oceanusBD', // Nombre de la base de datos
  entities: ['dist/**/*.entity{.ts,.js}'], // Entidades que usa TypeORM
  migrations: ['dist/migrations/*{.ts,.js}'], // Migraciones
  // autoLoadEntities: true,  // Cargar automáticamente las entidades
  synchronize: true, // Sincronizar solo en desarrollo, poner false en producción
  logging: true,
};

export default registerAs('typeorm', () => typeOrmConfig);

export const connectionSource = new DataSource(
  typeOrmConfig as DataSourceOptions,
);
