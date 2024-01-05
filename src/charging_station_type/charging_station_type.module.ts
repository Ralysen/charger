import { Module } from '@nestjs/common';
import { ChargingStationTypeController } from './charging_station_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChargingStationType } from './charging_station.entity';
import { ChargingStationTypeService } from './charging_station_type.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChargingStationType])],
  controllers: [ChargingStationTypeController],
  providers: [ChargingStationTypeService]
})
export class ChargingStationTypeModule {}
