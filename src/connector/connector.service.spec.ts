import { Test, TestingModule } from '@nestjs/testing';
import { Connector } from './connector.entity';
import { ConnectorController } from './connector.controller';
import { ConnectorService } from './connector.service';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ConnectorService', () => {
  let service: ConnectorService;

  const mockConnectorRepo = {
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    merge: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConnectorService,
        {
          provide: getRepositoryToken(Connector),
          useValue: mockConnectorRepo,
        },
      ],
      controllers: [ConnectorController],
    }).compile();

    service = module.get<ConnectorService>(ConnectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
