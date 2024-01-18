import { Module } from '@nestjs/common';
import { ChargingStationModule } from './charging-station/charging-station.module';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChargingStation } from './charging-station/charging-station.entity';
import { ChargingStationTypeModule } from './charging-station-type/charging-station-type.module';
import { ChargingStationType } from './charging-station-type/charging-station-type.entity';
import { ConnectorModule } from './connector/connector.module';
import { Connector } from './connector/connector.entity';
import { LoggerModule } from 'nestjs-pino';

dotenv.config();

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: () => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
            colorize: true,
            sync: false,
          },
        },
      },
    }),
    ChargingStationModule,
    ChargingStationTypeModule,
    ConnectorModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'postgres',
      synchronize: true,
      logging: false,
      entities: [ChargingStation, ChargingStationType, Connector],
    }),
  ],
})
export class AppModule {}
