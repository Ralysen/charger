import { Test, TestingModule } from '@nestjs/testing';
import { ChargingStationTypeController } from './charging-station-type.controller';
import { ChargingStationTypeService } from './charging-station-type.service';

describe('ChargingStationTypeController', () => {
  let controller: ChargingStationTypeController;
  const serviceChargingStationType = { findAll: () => ['test'] };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChargingStationTypeController],
      providers: [ChargingStationTypeService],
    })
      .overrideProvider(ChargingStationTypeService)
      .useValue(serviceChargingStationType)
      .compile();

    controller = module.get<ChargingStationTypeController>(
      ChargingStationTypeController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
