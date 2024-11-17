import { Test, TestingModule } from '@nestjs/testing';
import { SubcontratadosService } from './subcontratados.service';

describe('SubcontratadosService', () => {
  let service: SubcontratadosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubcontratadosService],
    }).compile();

    service = module.get<SubcontratadosService>(SubcontratadosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
