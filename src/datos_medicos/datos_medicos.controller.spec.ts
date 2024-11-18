import { Test, TestingModule } from '@nestjs/testing';
import { DatosMedicosController } from './datos_medicos.controller';
import { DatosMedicosService } from './datos_medicos.service';

describe('DatosMedicosController', () => {
  let controller: DatosMedicosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatosMedicosController],
      providers: [DatosMedicosService],
    }).compile();

    controller = module.get<DatosMedicosController>(DatosMedicosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
