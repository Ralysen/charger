import { Test, TestingModule } from '@nestjs/testing';
import { ChargingStationTypeService } from './charging-station-type.service';
import { ChargingStationTypeController } from './charging-station-type.controller';
import { ChargingStationType } from './charging-station-type.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateChargingStationTypeDTO } from './dto/create-charging-station-type.dto';
import { UpdateChargingStationTypeDTO } from './dto/update-charging-station-type.dto';
import { mock } from 'jest-mock-extended';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

describe('ChargingStationTypeService', () => {
  let service: ChargingStationTypeService;

  const mockChargingStationTypeRepo = {
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
    merge: jest.fn(),
  };

  const chargingStationType = {
    id: 'e017aed3-a579-4002-a873-d9c6e20cc631',
    name: 'test type name',
    plug_count: 5,
    efficiency: 12.12,
    current_type: 'AC',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChargingStationTypeService,
        {
          provide: getRepositoryToken(ChargingStationType),
          useValue: mockChargingStationTypeRepo,
        },
        {
          provide: AmqpConnection,
          useValue: mock<AmqpConnection>(),
        },
      ],
      controllers: [ChargingStationTypeController],
    }).compile();

    service = module.get<ChargingStationTypeService>(
      ChargingStationTypeService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Find all station types', () => {
    it('Should return all staion types correctly', async () => {
      //Arrange
      const stationTypes = [chargingStationType];

      jest
        .spyOn(mockChargingStationTypeRepo, 'find')
        .mockReturnValue(stationTypes);

      //Act
      const result = await service.findAll();

      //Assert
      expect(result).toEqual(stationTypes);
    });
  });

  describe('Find station type by Id', () => {
    it('Should return station type correctly', async () => {
      //Arrange
      const stationType = chargingStationType;

      jest
        .spyOn(mockChargingStationTypeRepo, 'findOneBy')
        .mockReturnValue(stationType);

      //Act
      const result = await service.findById(stationType.id);

      //Assert
      expect(result).toEqual(stationType);
      expect(mockChargingStationTypeRepo.findOneBy).toHaveBeenCalledWith({
        id: stationType.id,
      });
    });
  });

  describe('Create station type', () => {
    it('Should create station type successfully', async () => {
      //Arrange
      const createdChargingStationTypeDTO = {
        name: 'test type name',
        plug_count: 5,
        efficiency: 12.12,
      } as CreateChargingStationTypeDTO;

      jest
        .spyOn(mockChargingStationTypeRepo, 'save')
        .mockReturnValue(chargingStationType);

      //Act
      const result = await service.create(createdChargingStationTypeDTO);

      //Assert
      expect(result).toEqual(chargingStationType);
      expect(mockChargingStationTypeRepo.save).toHaveBeenCalledWith(
        createdChargingStationTypeDTO,
      );
    });
  });

  describe('Update station type', () => {
    it('Should update station type successfully', async () => {
      //Arrange
      const updateChargingStationTypeDTO = {
        name: 'test type name changed',
        plug_count: 6,
      } as UpdateChargingStationTypeDTO;

      const updatedChargingStationType = {
        id: 'e017aed3-a579-4002-a873-d9c6e20cc631',
        name: 'test type name',
        plug_count: 5,
        efficiency: 12.12,
        current_type: 'AC',
      };

      jest
        .spyOn(mockChargingStationTypeRepo, 'findOneBy')
        .mockReturnValue(chargingStationType);
      jest
        .spyOn(mockChargingStationTypeRepo, 'merge')
        .mockReturnValue(updatedChargingStationType);

      //Act
      await service.update(
        chargingStationType.id,
        updateChargingStationTypeDTO,
      );

      //Assert
      expect(mockChargingStationTypeRepo.findOneBy).toHaveBeenCalledWith({
        id: chargingStationType.id,
      });
      expect(mockChargingStationTypeRepo.merge).toHaveBeenCalledWith(
        chargingStationType,
        updateChargingStationTypeDTO,
      );
    });
  });

  describe('Delete station type', () => {
    it('Should delete station type successfully', async () => {
      //Arrange
      jest.spyOn(mockChargingStationTypeRepo, 'delete').mockReturnValue(null);

      //Act
      service.remove(chargingStationType.id);

      //Assert
      expect(mockChargingStationTypeRepo.delete).toHaveBeenCalledWith(
        chargingStationType.id,
      );
    });
  });
});
