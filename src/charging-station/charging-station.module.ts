import { Module } from '@nestjs/common';
import { ChargingStationController } from './charging-station.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChargingStation } from './charging-station.entity';
import { ChargingStationService } from './charging-station.service';
import { RabbitmqGlobalModule } from 'src/rabbit-mq/rabbit-mq.module';

@Module({
  imports: [TypeOrmModule.forFeature([ChargingStation]), RabbitmqGlobalModule],
  controllers: [ChargingStationController],
  providers: [ChargingStationService],
})
export class ChargingStationModule {}
