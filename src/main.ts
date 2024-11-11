import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para permitir el acceso desde el frontend
  app.enableCors({
    origin: 'http://localhost:3000', // Cambia esto al puerto donde corre tu frontend
    credentials: true,
  });

  // Escuchar en el puerto especificado en la variable de entorno o en el 3001 por defecto
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
