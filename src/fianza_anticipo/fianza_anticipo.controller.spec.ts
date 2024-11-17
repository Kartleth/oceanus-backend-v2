import { Test, TestingModule } from '@nestjs/testing';
import { FianzaAnticipoController } from './fianza_anticipo.controller';
import { FianzaAnticipoService } from './fianza_anticipo.service';

describe('FianzaAnticipoController', () => {
  let controller: FianzaAnticipoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FianzaAnticipoController],
      providers: [FianzaAnticipoService],
    }).compile();

    controller = module.get<FianzaAnticipoController>(FianzaAnticipoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
