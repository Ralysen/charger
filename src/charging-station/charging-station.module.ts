import { Module } from '@nestjs/common';
import { ChargingStationController } from './charging-station.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChargingStation } from './charging-station.entity';
import { ChargingStationService } from './charging-station.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChargingStation])],
  controllers: [ChargingStationController],
  providers: [ChargingStationService],
})
export class ChargingStationModule {}
