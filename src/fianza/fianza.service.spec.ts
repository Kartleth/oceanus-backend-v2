import { Test, TestingModule } from '@nestjs/testing';
import { FianzaService } from './fianza.service';

describe('FianzaService', () => {
  let service: FianzaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FianzaService],
    }).compile();

    service = module.get<FianzaService>(FianzaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
