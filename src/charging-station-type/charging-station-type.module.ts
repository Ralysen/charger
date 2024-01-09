import { Module } from '@nestjs/common';
import { ChargingStationTypeController } from './charging-station-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChargingStationType } from './charging-station-type.entity';
import { ChargingStationTypeService } from './charging-station-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChargingStationType])],
  controllers: [ChargingStationTypeController],
  providers: [ChargingStationTypeService],
})
export class ChargingStationTypeModule {}
