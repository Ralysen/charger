import { Global, Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import * as dotenv from 'dotenv';

dotenv.config();
@Global()
@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      queues: [
        {
          name: 'test',
        },
      ],
      exchanges: [
        {
          name: 'exchange1',
          type: 'topic',
        },
      ],
      uri: process.env.CLOUDAMQP_URL,
      enableControllerDiscovery: true,
    }),
  ],
  exports: [RabbitMQModule],
})
export class RabbitmqGlobalModule {}
