import { Test, TestingModule } from '@nestjs/testing';
import { FormacademicaController } from './formacademica.controller';
import { FormacademicaService } from './formacademica.service';

describe('FormacademicaController', () => {
  let controller: FormacademicaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormacademicaController],
      providers: [FormacademicaService],
    }).compile();

    controller = module.get<FormacademicaController>(FormacademicaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
