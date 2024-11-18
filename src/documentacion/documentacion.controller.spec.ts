import { Test, TestingModule } from '@nestjs/testing';
import { DocumentacionController } from './documentacion.controller';
import { DocumentacionService } from './documentacion.service';

describe('DocumentacionController', () => {
  let controller: DocumentacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentacionController],
      providers: [DocumentacionService],
    }).compile();

    controller = module.get<DocumentacionController>(DocumentacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
