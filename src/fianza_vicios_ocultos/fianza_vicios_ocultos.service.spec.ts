import { Test, TestingModule } from '@nestjs/testing';
import { FianzaViciosOcultosService } from './fianza_vicios_ocultos.service';

describe('FianzaViciosOcultosService', () => {
  let service: FianzaViciosOcultosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FianzaViciosOcultosService],
    }).compile();

    service = module.get<FianzaViciosOcultosService>(FianzaViciosOcultosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
