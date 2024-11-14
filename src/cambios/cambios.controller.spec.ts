import { Test, TestingModule } from '@nestjs/testing';
import { CambiosController } from './cambios.controller';
import { CambiosService } from './cambios.service';

describe('CambiosController', () => {
  let controller: CambiosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CambiosController],
      providers: [CambiosService],
    }).compile();

    controller = module.get<CambiosController>(CambiosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
