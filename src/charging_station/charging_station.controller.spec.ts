import { Test, TestingModule } from '@nestjs/testing';
import { ChargingStationController } from './charging_station.controller';

describe('ChargingStationController', () => {
  let controller: ChargingStationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChargingStationController],
    }).compile();

    controller = module.get<ChargingStationController>(ChargingStationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
