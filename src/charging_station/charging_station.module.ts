import { Module } from '@nestjs/common';
import { ChargingStationController } from './charging_station.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChargingStation } from './charging_station.entity';
import { ChargingStationService } from './charging_station.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChargingStation])],
  controllers: [ChargingStationController],
  providers: [ChargingStationService]
})
export class ChargingStationModule {}
