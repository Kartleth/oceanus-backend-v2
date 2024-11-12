import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api') // Prefijo '/api' para todas las rutas en este controlador
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('endpoint') // Ruta '/api/endpoint'
  getEndpoint(): { message: string } {
    return { message: 'Datos del backend recibidos correctamente' };
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
