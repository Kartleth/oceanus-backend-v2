import { Test, TestingModule } from '@nestjs/testing';
import { ConvenioService } from './convenio.service';

describe('ConvenioService', () => {
  let service: ConvenioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConvenioService],
    }).compile();

    service = module.get<ConvenioService>(ConvenioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
