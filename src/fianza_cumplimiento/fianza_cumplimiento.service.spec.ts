import { Test, TestingModule } from '@nestjs/testing';
import { FianzaCumplimientoService } from './fianza_cumplimiento.service';

describe('FianzaCumplimientoService', () => {
  let service: FianzaCumplimientoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FianzaCumplimientoService],
    }).compile();

    service = module.get<FianzaCumplimientoService>(FianzaCumplimientoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
