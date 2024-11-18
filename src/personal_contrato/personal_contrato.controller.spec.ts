import { Test, TestingModule } from '@nestjs/testing';
import { PersonalContratoController } from './personal_contrato.controller';
import { PersonalContratoService } from './personal_contrato.service';

describe('PersonalContratoController', () => {
  let controller: PersonalContratoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonalContratoController],
      providers: [PersonalContratoService],
    }).compile();

    controller = module.get<PersonalContratoController>(PersonalContratoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
