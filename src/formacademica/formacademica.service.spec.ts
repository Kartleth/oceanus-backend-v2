import { Test, TestingModule } from '@nestjs/testing';
import { FormacademicaService } from './formacademica.service';

describe('FormacademicaService', () => {
  let service: FormacademicaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormacademicaService],
    }).compile();

    service = module.get<FormacademicaService>(FormacademicaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
