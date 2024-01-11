import { Test, TestingModule } from '@nestjs/testing';
import { ConnectorController } from './connector.controller';
import { ConnectorService } from './connector.service';
import { Connector } from './connector.entity';

describe('ConnectorController', () => {
  let controller: ConnectorController;
  let service: ConnectorService;

  const mockConnector = {
    id: '6db82ff1-2aea-4736-b3ae-89763a727939',
    name: 'test name',
    priority: true,
  } as Connector;

  const mockConnectorService = {
    findAll: jest.fn().mockResolvedValue([mockConnector]),
    findById: jest.fn().mockResolvedValue(mockConnector),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConnectorController],
      providers: [
        ConnectorService,
        {
          provide: ConnectorService,
          useValue: mockConnectorService,
        },
      ],
    }).compile();

    service = module.get<ConnectorService>(ConnectorService);
    controller = module.get<ConnectorController>(ConnectorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Get all charging station types (findAll)', () => {
    it('Should get all charging station types successfully', async () => {
      //Act
      const result = await controller.findAll();

      //Assert
      expect(result).toEqual([mockConnector]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('Get charging station by Id (findById', () => {
    it('Should get charging station by Id successfully', async () => {
      //Act
      const result = await controller.findById(mockConnector.id as any);

      //Assert
      expect(result).toEqual(mockConnector);
      expect(service.findById).toHaveBeenCalled();
    });
  });

  describe('Create new charging station (create)', () => {
    it('Should create charging station successfully', async () => {
      //Arrange
      const newConnector = mockConnector;

      mockConnectorService.create = jest
        .fn()
        .mockResolvedValueOnce(mockConnector);

      //Act
      const result = await controller.create(newConnector);

      //Assert
      expect(result).toEqual(newConnector);
      expect(service.findById).toHaveBeenCalled();
    });
  });

  describe('Update charging station (update)', () => {
    it('Should update charging station successfully', async () => {
      //Arrange
      const updatedConnector = { ...mockConnector, name: 'changed test name' };
      const changeConnector = { name: 'changed test name' };

      mockConnectorService.update = jest
        .fn()
        .mockResolvedValueOnce(updatedConnector);

      //Act
      const result = await controller.update(
        mockConnector.id as any,
        changeConnector,
      );

      //Assert
      expect(result).toEqual(updatedConnector);
      expect(service.update).toHaveBeenCalled();
    });
  });

  describe('Delete charging station (delete0', () => {
    it('Should delete charging station successfully', async () => {
      //Act
      await controller.remove(mockConnector.id as any);

      //Assert
      expect(service.remove).toHaveBeenCalled();
    });
  });
});
