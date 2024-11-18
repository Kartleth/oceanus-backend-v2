import { Test, TestingModule } from '@nestjs/testing';
import { FianzaCumplimientoController } from './fianza_cumplimiento.controller';
import { FianzaCumplimientoService } from './fianza_cumplimiento.service';

describe('FianzaCumplimientoController', () => {
  let controller: FianzaCumplimientoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FianzaCumplimientoController],
      providers: [FianzaCumplimientoService],
    }).compile();

    controller = module.get<FianzaCumplimientoController>(FianzaCumplimientoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
