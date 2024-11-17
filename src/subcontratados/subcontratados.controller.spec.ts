import { Test, TestingModule } from '@nestjs/testing';
import { SubcontratadosController } from './subcontratados.controller';
import { SubcontratadosService } from './subcontratados.service';

describe('SubcontratadosController', () => {
  let controller: SubcontratadosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubcontratadosController],
      providers: [SubcontratadosService],
    }).compile();

    controller = module.get<SubcontratadosController>(SubcontratadosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
