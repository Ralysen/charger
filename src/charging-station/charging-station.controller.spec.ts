import { Test, TestingModule } from '@nestjs/testing';
import { ChargingStationController } from './charging-station.controller';
import { ChargingStationService } from './charging-station.service';
import { ChargingStation } from './charging-station.entity';

describe('ChargingStationController', () => {
  let controller: ChargingStationController;
  let service: ChargingStationService;

  const mockChargingStation = {
    id: '6db82ff1-2aea-4736-b3ae-89763a727939',
    name: 'test name',
    device_id: 'e017aed3-a579-4002-a873-d9c6e20cc631',
    ip_address: '123.456.78.90',
    firmware_version: '1.0',
  } as ChargingStation;
  
  const mockChargingStationService = {
    findAll: jest.fn().mockResolvedValue([mockChargingStation]),
    findById: jest.fn().mockResolvedValue(mockChargingStation),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChargingStationController],
      providers: [ChargingStationService, 
        {
          provide: ChargingStationService,
          useValue: mockChargingStationService,
        }
      ],
    }).compile();

    service = module.get<ChargingStationService>(
      ChargingStationService,
    );
    controller = module.get<ChargingStationController>(
      ChargingStationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Get all charging stations (findAll)', () => {
    it('Should get all charging stations successfully', async () => {
      //Act
      const result = await controller.findAll();

      //Assert
      expect(result).toEqual([mockChargingStation]);
      expect(service.findAll).toHaveBeenCalled();
    })
  })

  describe('Get charging station by Id (findById', () => {
    it('Should get charging station by Id successfully', async () => {
      //Act
      const result = await controller.findById(mockChargingStation.id);

      //Assert
      expect(result).toEqual(mockChargingStation);
      expect(service.findById).toHaveBeenCalled();
    })
  })

  describe('Create new charging station (create)', () => {
    it('Should create charging station successfully', async () => {
      //Arrange
      const newChargingStation = mockChargingStation;

      mockChargingStationService.create = jest.fn().mockResolvedValueOnce(mockChargingStation);

      //Act
      const result = await controller.create(newChargingStation);

      //Assert
      expect(result).toEqual(newChargingStation);
      expect(service.findById).toHaveBeenCalled();
    })
  })

  describe('Update charging station (update)', () => {
    it('Should update charging station successfully', async () => {
      //Arrange
      const updatedChargingStation = {...mockChargingStation, name: 'changed test name'};
      const changeChargingStation = { name: 'changed test name'};
      
      mockChargingStationService.update = jest.fn().mockResolvedValueOnce(updatedChargingStation);

      //Act
      const result = await controller.update(mockChargingStation.id, changeChargingStation);

      //Assert
      expect(result).toEqual(updatedChargingStation);
      expect(service.update).toHaveBeenCalled()
    })
  })

  describe('Delete charging station (delete0', () => {
    it('Should delete charging station successfully', async () => {
      //Act
      await controller.remove(mockChargingStation.id);

      //Assert
      expect(service.remove).toHaveBeenCalled();
    })
  })
});
