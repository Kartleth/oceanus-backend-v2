import { Test, TestingModule } from '@nestjs/testing';
import { FianzaViciosOcultosController } from './fianza_vicios_ocultos.controller';
import { FianzaViciosOcultosService } from './fianza_vicios_ocultos.service';

describe('FianzaViciosOcultosController', () => {
  let controller: FianzaViciosOcultosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FianzaViciosOcultosController],
      providers: [FianzaViciosOcultosService],
    }).compile();

    controller = module.get<FianzaViciosOcultosController>(FianzaViciosOcultosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
