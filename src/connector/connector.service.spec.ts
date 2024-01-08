import { Test, TestingModule } from '@nestjs/testing';
import { Connector } from './connector.entity';
import { ConnectorController } from './connector.controller';
import { ConnectorService } from './connector.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateConnectorDTO } from './dto/create-connector.dto';
import { UpdateConnectorDTO } from './dto/update-connector.dto';

describe('ConnectorService', () => {
  let service: ConnectorService;

  const mockConnectorRepo = {
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
    merge: jest.fn(),
  };

  const connector = {
    id: '6db82ff1-2aea-4736-b3ae-89763a727939',
    name: 'test name',
    priority: true,
  } as Connector;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConnectorController],
      providers: [
        ConnectorService,
        {
          provide: getRepositoryToken(Connector),
          useValue: mockConnectorRepo,
        },
      ],
    }).compile();

    service = module.get<ConnectorService>(ConnectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Find all connectors', () => {
    it('Should return all connectors successfully', async () => {
      //Arrange
      const connectors = [connector];

      jest.spyOn(mockConnectorRepo, 'find').mockReturnValue(connectors);

      //Act
      const result = await service.findAll();

      //Assert
      expect(result).toEqual(connectors);
    });
  });

  describe('Find connector by Id', () => {
    it('Should return connector successfully', async () => {
      //Arrange
      jest.spyOn(mockConnectorRepo, 'findOneBy').mockReturnValue(connector);

      //Act
      const result = await service.findById(connector.id);

      //Assert
      expect(result).toEqual(connector);
      expect(mockConnectorRepo.findOneBy).toHaveBeenCalledWith({
        id: connector.id,
      });
    });
  });

  describe('Create connector', () => {
    it('Should create connector successfully', async () => {
      //Arrange
      const createConnectorDTO = {
        name: 'test name',
        priority: true,
      } as CreateConnectorDTO;

      jest.spyOn(mockConnectorRepo, 'save').mockReturnValue(connector);

      //Act
      const result = await service.create(createConnectorDTO);

      //Assert
      expect(result).toEqual(connector);
      expect(mockConnectorRepo.save).toHaveBeenCalledWith(createConnectorDTO);
    });
  });

  describe('Update connector', () => {
    it('Should update connector successfully', async () => {
      //Arrange
      const updateConnectorDTO = {
        name: 'test name changed',
      } as UpdateConnectorDTO;

      const updatedConnector = {
        id: '6db82ff1-2aea-4736-b3ae-89763a727939',
        name: 'test name changed',
        priority: true,
      };

      jest.spyOn(mockConnectorRepo, 'findOneBy').mockReturnValue(connector);
      jest.spyOn(mockConnectorRepo, 'merge').mockReturnValue(updatedConnector);

      //Act
      await service.update(connector.id, updateConnectorDTO);

      //Assert
      expect(mockConnectorRepo.findOneBy).toHaveBeenCalledWith({
        id: connector.id,
      });
      expect(mockConnectorRepo.merge).toHaveBeenCalledWith(
        connector,
        updateConnectorDTO,
      );
    });
  });

  describe('', () => {
    it('', async () => {
      //Arrange
      jest.spyOn(mockConnectorRepo, 'delete').mockReturnValue(null);

      //Act
      await service.remove(connector.id);

      //Assert
      expect(mockConnectorRepo.delete).toHaveBeenCalledWith(connector.id);
    });
  });
});
