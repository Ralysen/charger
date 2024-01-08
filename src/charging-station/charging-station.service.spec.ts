import { Test, TestingModule } from '@nestjs/testing';
import { ChargingStationService } from './charging-station.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ChargingStation } from './charging-station.entity';
import { ChargingStationController } from './charging-station.controller';
import { CreateChargingStationDTO } from './dto/create-charging-station.dto';
import { UpdateChargingStationDTO } from './dto/update-charging-station.dto';

describe('ChargingStationService', () => {
  let service: ChargingStationService;

  const mockChargingStationRepo = {
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
    merge: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChargingStationController],
      providers: [
        ChargingStationService,
        {
          provide: getRepositoryToken(ChargingStation),
          useValue: mockChargingStationRepo,
        },
      ],
    }).compile();

    service = module.get<ChargingStationService>(ChargingStationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Find all stations (findAll)', () => {
    it('Should return all charging stations correctly', async () => {
      //Arrange
      const chargingStation = {
        id: '6db82ff1-2aea-4736-b3ae-89763a727939',
        name: 'test name',
        device_id: 'e017aed3-a579-4002-a873-d9c6e20cc631',
        ip_address: '123.456.78.90',
        firmware_version: '1.0',
      };

      const stations = [chargingStation];

      jest.spyOn(mockChargingStationRepo, 'find').mockReturnValue(stations);

      //Act
      const result = await service.findAll();

      //Assert
      expect(result).toEqual(stations);
    });

    it('Should return status 500', () => {});
  });

  describe('Find station by Id (find)', () => {
    it('Should return station correctly', async () => {
      //Arrange
      const id = '6db82ff1-2aea-4736-b3ae-89763a727939';
      const chargingStation = {
        id: '6db82ff1-2aea-4736-b3ae-89763a727939',
        name: 'test name',
        device_id: 'e017aed3-a579-4002-a873-d9c6e20cc631',
        ip_address: '123.456.78.90',
        firmware_version: '1.0',
      };

      const station = [chargingStation];

      jest.spyOn(mockChargingStationRepo, 'findOneBy').mockReturnValue(station);

      //Act
      const result = await service.findById(id);

      //Assert
      expect(result).toEqual(station);
      expect(mockChargingStationRepo.findOneBy).toHaveBeenCalledWith({ id });
    });
  });

  describe('Create new station (create)', () => {
    it('Should create station correctly', async () => {
      //Arrange
      const chargingStationDTO = {
        name: 'test name',
        device_id: 'e017aed3-a579-4002-a873-d9c6e20cc631',
        ip_address: '123.456.78.90',
        firmware_version: '1.0',
      } as CreateChargingStationDTO;

      const chargingStation = {
        id: '6db82ff1-2aea-4736-b3ae-89763a727939',
        name: 'test name',
        device_id: 'e017aed3-a579-4002-a873-d9c6e20cc631',
        ip_address: '123.456.78.90',
        firmware_version: '1.0',
      } as ChargingStation;

      jest
        .spyOn(mockChargingStationRepo, 'save')
        .mockReturnValue(chargingStation);

      //Act
      const result = await service.create(chargingStationDTO);

      //Assert
      expect(result).toEqual(chargingStation);
      expect(mockChargingStationRepo.save).toBeCalledWith(chargingStationDTO);
    });
  });

  describe('Update station by Id', () => {
    it('Should update station correctly', async () => {
      //Arrange
      const id = '6db82ff1-2aea-4736-b3ae-89763a727939';

      const updateChargingStationDTO = {
        name: 'test name changed',
      } as UpdateChargingStationDTO;

      const chargingStation = {
        id: '6db82ff1-2aea-4736-b3ae-89763a727939',
        name: 'test name',
        device_id: 'e017aed3-a579-4002-a873-d9c6e20cc631',
        ip_address: '123.456.78.90',
        firmware_version: '1.0',
      } as ChargingStation;

      const updatedChargingStation = {
        id: '6db82ff1-2aea-4736-b3ae-89763a727939',
        name: 'test name changed',
        device_id: 'e017aed3-a579-4002-a873-d9c6e20cc631',
        ip_address: '123.456.78.90',
        firmware_version: '1.0',
      } as ChargingStation;

      jest
        .spyOn(mockChargingStationRepo, 'findOneBy')
        .mockReturnValue(chargingStation);
      jest
        .spyOn(mockChargingStationRepo, 'merge')
        .mockReturnValue(updatedChargingStation);

      //Act
      await service.update(id, updateChargingStationDTO);

      //Assert
      expect(mockChargingStationRepo.findOneBy).toHaveBeenCalledWith({ id });
      expect(mockChargingStationRepo.merge).toHaveBeenCalledWith(
        chargingStation,
        updateChargingStationDTO,
      );
    });
  });

  describe('Delete station by Id', () => {
    it('Should delete station correctly', () => {
      //Arrange
      const id = '6db82ff1-2aea-4736-b3ae-89763a727939';

      jest.spyOn(mockChargingStationRepo, 'delete').mockReturnValue(null);

      //Act
      service.remove(id);

      //Assert
      expect(mockChargingStationRepo.delete).toHaveBeenCalledWith(id);
    });
  });
});
