import { Test, TestingModule } from '@nestjs/testing';
import { PersonalContratoService } from './personal_contrato.service';

describe('PersonalContratoService', () => {
  let service: PersonalContratoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonalContratoService],
    }).compile();

    service = module.get<PersonalContratoService>(PersonalContratoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
