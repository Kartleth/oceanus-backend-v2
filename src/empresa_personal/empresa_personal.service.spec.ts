import { Test, TestingModule } from '@nestjs/testing';
import { EmpresaPersonalService } from './empresa_personal.service';

describe('EmpresaPersonalService', () => {
  let service: EmpresaPersonalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmpresaPersonalService],
    }).compile();

    service = module.get<EmpresaPersonalService>(EmpresaPersonalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
