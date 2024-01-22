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
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: parseInt(configService.get<string>('database.port')),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        synchronize: true,
        logging: false,
        entities: [ChargingStation, ChargingStationType, Connector],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
