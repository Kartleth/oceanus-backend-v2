import { Test, TestingModule } from '@nestjs/testing';
import { DocsubcontratadoService } from './docsubcontratado.service';

describe('DocsubcontratadoService', () => {
  let service: DocsubcontratadoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocsubcontratadoService],
    }).compile();

    service = module.get<DocsubcontratadoService>(DocsubcontratadoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
