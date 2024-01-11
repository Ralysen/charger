import { Test, TestingModule } from '@nestjs/testing';
import { ChargingStationController } from './charging-station.controller';
import { ChargingStationService } from './charging-station.service';
import { ChargingStation } from './charging-station.entity';
import { NotFoundException } from '@nestjs/common';
import { ResponseUtils } from 'src/response-handling/response-utils';

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
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChargingStationController],
      providers: [
        ChargingStationService,
        {
          provide: ChargingStationService,
          useValue: mockChargingStationService,
        },
      ],
    }).compile();

    service = module.get<ChargingStationService>(ChargingStationService);
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
    });

    it('Should return not found error', async () => {
      //Arrang
      jest.spyOn(mockChargingStationService, 'findAll').mockResolvedValue(null);

      //Assert
      expect(async () => {
        await controller.findAll();
      }).rejects.toThrow(NotFoundException);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('Get charging station by Id (findById', () => {
    it('Should get charging station by Id successfully', async () => {
      //Act
      const result = await controller.findById(mockChargingStation.id as any);

      //Assert
      expect(result).toEqual(mockChargingStation);
      expect(service.findById).toHaveBeenCalled();
    });

    it('Should return not found error', async () => {
      //Arrange
      jest
        .spyOn(mockChargingStationService, 'findById')
        .mockResolvedValue(null);

      //Assert
      expect(async () => {
        await controller.findById(mockChargingStation.id as any);
      }).rejects.toThrow(NotFoundException);
      expect(service.findById).toHaveBeenCalled();
    });
  });

  describe('Create new charging station (create)', () => {
    it('Should create charging station successfully', async () => {
      //Arrange
      const newChargingStation = mockChargingStation;

      mockChargingStationService.create = jest
        .fn()
        .mockResolvedValueOnce(mockChargingStation);

      //Act
      const result = await controller.create(newChargingStation);

      //Assert
      expect(result).toEqual(
        ResponseUtils.sendResponse(
          201,
          `Station ${mockChargingStation.id} created successfully!`,
          newChargingStation,
        ),
      );
      expect(service.findById).toHaveBeenCalled();
    });
  });

  describe('Update charging station (update)', () => {
    it('Should update charging station successfully', async () => {
      //Arrange
      jest
        .spyOn(mockChargingStationService, 'findById')
        .mockResolvedValue(mockChargingStation);
      const updatedChargingStation = {
        ...mockChargingStation,
        name: 'changed test name',
      };
      const changeChargingStation = { name: 'changed test name' };

      mockChargingStationService.update = jest
        .fn()
        .mockResolvedValueOnce(updatedChargingStation);

      //Act
      const result = await controller.update(
        mockChargingStation.id as any,
        changeChargingStation,
      );

      //Assert
      expect(result).toEqual(
        ResponseUtils.sendResponse(
          200,
          `Station ${mockChargingStation.id} updated successfully!`,
          updatedChargingStation,
        ),
      );
      expect(service.update).toHaveBeenCalled();
    });

    it('Should return not found error', async () => {
      //Arrange
      const changeChargingStation = { name: 'changed test name' };
      jest
        .spyOn(mockChargingStationService, 'findById')
        .mockResolvedValue(null);

      //Assert
      expect(async () => {
        await controller.update(
          mockChargingStation.id as any,
          changeChargingStation,
        );
      }).rejects.toThrow(NotFoundException);
      expect(service.update).toHaveBeenCalled();
    });
  });

  describe('Delete charging station (delete0', () => {
    it('Should delete charging station successfully', async () => {
      //Arrange
      jest
        .spyOn(mockChargingStationService, 'findById')
        .mockResolvedValue(mockChargingStation);

      //Act
      await controller.remove(mockChargingStation.id as any);

      //Assert
      expect(service.remove).toHaveBeenCalled();
    });

    it('Should return not found error', async () => {
      //Arrange
      jest
        .spyOn(mockChargingStationService, 'findById')
        .mockResolvedValue(null);

      //Assert
      expect(async () => {
        await controller.remove(mockChargingStation.id as any);
      }).rejects.toThrow(NotFoundException);
      expect(service.remove).toHaveBeenCalled();
    });
  });
});
