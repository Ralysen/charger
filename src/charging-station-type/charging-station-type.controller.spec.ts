import { Test, TestingModule } from '@nestjs/testing';
import { ChargingStationTypeController } from './charging-station-type.controller';
import { ChargingStationTypeService } from './charging-station-type.service';
import { ChargingStationType } from './charging-station-type.entity';

describe('ChargingStationTypeController', () => {
  let controller: ChargingStationTypeController;
  let service: ChargingStationTypeService;

  const mockChargingStationType = {
    id: '6db82ff1-2aea-4736-b3ae-89763a727939',
    name: 'test name',
    plug_count: 5,
    efficiency: 12.12,
    current_type: 'AC',
  } as ChargingStationType;

  const mockChargingStationTypeService = {
    findAll: jest.fn().mockResolvedValue([mockChargingStationType]),
    findById: jest.fn().mockResolvedValue(mockChargingStationType),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChargingStationTypeController],
      providers: [
        ChargingStationTypeService,
        {
          provide: ChargingStationTypeService,
          useValue: mockChargingStationTypeService,
        },
      ],
    }).compile();

    service = module.get<ChargingStationTypeService>(
      ChargingStationTypeService,
    );
    controller = module.get<ChargingStationTypeController>(
      ChargingStationTypeController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Get all charging station types (findAll)', () => {
    it('Should get all charging station types successfully', async () => {
      //Act
      const result = await controller.findAll();

      //Assert
      expect(result).toEqual([mockChargingStationType]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('Get charging station by Id (findById', () => {
    it('Should get charging station by Id successfully', async () => {
      //Act
      const result = await controller.findById(
        mockChargingStationType.id as any,
      );

      //Assert
      expect(result).toEqual(mockChargingStationType);
      expect(service.findById).toHaveBeenCalled();
    });
  });

  describe('Create new charging station (create)', () => {
    it('Should create charging station successfully', async () => {
      //Arrange
      const newChargingStation = mockChargingStationType;

      mockChargingStationTypeService.create = jest
        .fn()
        .mockResolvedValueOnce(mockChargingStationType);

      //Act
      const result = await controller.create(newChargingStation);

      //Assert
      expect(result).toEqual(newChargingStation);
      expect(service.findById).toHaveBeenCalled();
    });
  });

  describe('Update charging station (update)', () => {
    it('Should update charging station successfully', async () => {
      //Arrange
      const updatedChargingStation = {
        ...mockChargingStationType,
        name: 'changed test name',
      };
      const changeChargingStation = { name: 'changed test name' };

      mockChargingStationTypeService.update = jest
        .fn()
        .mockResolvedValueOnce(updatedChargingStation);

      //Act
      const result = await controller.update(
        mockChargingStationType.id as any,
        changeChargingStation,
      );

      //Assert
      expect(result).toEqual(updatedChargingStation);
      expect(service.update).toHaveBeenCalled();
    });
  });

  describe('Delete charging station (delete0', () => {
    it('Should delete charging station successfully', async () => {
      //Act
      await controller.remove(mockChargingStationType.id as any);

      //Assert
      expect(service.remove).toHaveBeenCalled();
    });
  });
});
