import { Test, TestingModule } from '@nestjs/testing';
import { DatosMedicosService } from './datos_medicos.service';

describe('DatosMedicosService', () => {
  let service: DatosMedicosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatosMedicosService],
    }).compile();

    service = module.get<DatosMedicosService>(DatosMedicosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
