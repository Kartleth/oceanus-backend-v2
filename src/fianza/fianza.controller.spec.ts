import { Test, TestingModule } from '@nestjs/testing';
import { FianzaController } from './fianza.controller';
import { FianzaService } from './fianza.service';

describe('FianzaController', () => {
  let controller: FianzaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FianzaController],
      providers: [FianzaService],
    }).compile();

    controller = module.get<FianzaController>(FianzaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
