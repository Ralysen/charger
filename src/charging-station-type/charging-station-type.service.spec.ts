import { Test, TestingModule } from '@nestjs/testing';
import { ChargingStationTypeService } from './charging-station-type.service';

describe('ChargingStationTypeService', () => {
  let service: ChargingStationTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChargingStationTypeService],
    }).compile();

    service = module.get<ChargingStationTypeService>(
      ChargingStationTypeService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
