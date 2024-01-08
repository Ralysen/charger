import { Test, TestingModule } from '@nestjs/testing';
import { ConnectorController } from './connector.controller';
import { ConnectorService } from './connector.service';

describe('ConnectorController', () => {
  let controller: ConnectorController;
  const serviceConnector = { findAll: () => ['test'] };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConnectorController],
      providers: [ConnectorService],
    })
      .overrideProvider(ConnectorService)
      .useValue(serviceConnector)
      .compile();

    controller = module.get<ConnectorController>(ConnectorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
