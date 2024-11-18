import { Test, TestingModule } from '@nestjs/testing';
import { FianzaAnticipoService } from './fianza_anticipo.service';

describe('FianzaAnticipoService', () => {
  let service: FianzaAnticipoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FianzaAnticipoService],
    }).compile();

    service = module.get<FianzaAnticipoService>(FianzaAnticipoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
