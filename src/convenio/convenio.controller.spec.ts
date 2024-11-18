import { Test, TestingModule } from '@nestjs/testing';
import { ConvenioController } from './convenio.controller';
import { ConvenioService } from './convenio.service';

describe('ConvenioController', () => {
  let controller: ConvenioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConvenioController],
      providers: [ConvenioService],
    }).compile();

    controller = module.get<ConvenioController>(ConvenioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
