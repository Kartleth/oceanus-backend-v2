import { Test, TestingModule } from '@nestjs/testing';
import { DocsubcontratadoController } from './docsubcontratado.controller';
import { DocsubcontratadoService } from './docsubcontratado.service';

describe('DocsubcontratadoController', () => {
  let controller: DocsubcontratadoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocsubcontratadoController],
      providers: [DocsubcontratadoService],
    }).compile();

    controller = module.get<DocsubcontratadoController>(DocsubcontratadoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
