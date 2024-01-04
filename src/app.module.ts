import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChargingStationModule } from './charging_station/charging_station.module';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChargingStation } from './charging_station/entity';

dotenv.config();

@Module({
  imports: [ChargingStationModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'charger',
      synchronize: true,
      logging: false,
      entities: [ChargingStation]

  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
