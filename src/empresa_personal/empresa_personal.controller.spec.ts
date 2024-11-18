import { Test, TestingModule } from '@nestjs/testing';
import { EmpresaPersonalController } from './empresa_personal.controller';
import { EmpresaPersonalService } from './empresa_personal.service';

describe('EmpresaPersonalController', () => {
  let controller: EmpresaPersonalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmpresaPersonalController],
      providers: [EmpresaPersonalService],
    }).compile();

    controller = module.get<EmpresaPersonalController>(EmpresaPersonalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
