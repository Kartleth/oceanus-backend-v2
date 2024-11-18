import { Test, TestingModule } from '@nestjs/testing';
import { OrdenServicioService } from './orden_servicio.service';

describe('OrdenServicioService', () => {
  let service: OrdenServicioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdenServicioService],
    }).compile();

    service = module.get<OrdenServicioService>(OrdenServicioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
