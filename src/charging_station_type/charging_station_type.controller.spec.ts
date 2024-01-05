import { Test, TestingModule } from '@nestjs/testing';
import { ChargingStationTypeController } from './charging_station_type.controller';

describe('ChargingStationTypeController', () => {
  let controller: ChargingStationTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChargingStationTypeController],
    }).compile();

    controller = module.get<ChargingStationTypeController>(ChargingStationTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
