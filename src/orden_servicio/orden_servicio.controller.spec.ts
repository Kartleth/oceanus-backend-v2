import { Test, TestingModule } from '@nestjs/testing';
import { OrdenServicioController } from './orden_servicio.controller';
import { OrdenServicioService } from './orden_servicio.service';

describe('OrdenServicioController', () => {
  let controller: OrdenServicioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdenServicioController],
      providers: [OrdenServicioService],
    }).compile();

    controller = module.get<OrdenServicioController>(OrdenServicioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
