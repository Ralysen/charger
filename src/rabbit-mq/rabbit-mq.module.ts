import { Global, Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import * as dotenv from 'dotenv';
import { ConfigModule, ConfigService } from '@nestjs/config';

dotenv.config();
@Global()
@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        queues: [
          {
            name: configService.get<string>('rabbitmq.queue'),
          },
        ],
        exchanges: [
          {
            name: configService.get<string>('rabbitmq.exchange'),
            type: configService.get<string>('rabbitmq.topic'),
          },
        ],
        uri: configService.get<string>('rabbitmq.url'),
        enableControllerDiscovery: true,
      }),
    }),
  ],
  exports: [RabbitMQModule],
})
export class RabbitmqGlobalModule {}
