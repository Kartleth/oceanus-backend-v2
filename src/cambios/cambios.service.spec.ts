import { Test, TestingModule } from '@nestjs/testing';
import { CambiosService } from './cambios.service';

describe('CambiosService', () => {
  let service: CambiosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CambiosService],
    }).compile();

    service = module.get<CambiosService>(CambiosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
