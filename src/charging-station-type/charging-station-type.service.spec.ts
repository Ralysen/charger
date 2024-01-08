import { Test, TestingModule } from '@nestjs/testing';
import { ChargingStationTypeService } from './charging-station-type.service';
import { ChargingStationTypeController } from './charging-station-type.controller';
import { ChargingStationType } from './charging-station-type.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ChargingStationTypeService', () => {
  let service: ChargingStationTypeService;

  const mockChargingStationTypeRepo = {
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
        ChargingStationTypeService,
        {
          provide: getRepositoryToken(ChargingStationType),
          useValue: mockChargingStationTypeRepo,
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
});
