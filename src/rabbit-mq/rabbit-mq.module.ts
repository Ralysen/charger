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
          name: process.env.RABBIT_MQ_QUEUE || 'test',
        },
      ],
      exchanges: [
        {
          name: process.env.RABBIT_MQ_EXCHANGE || 'exchange1',
          type: process.env.RABBIT_MQ_EXCHANGE_TYPE || 'topic',
        },
      ],
      uri: process.env.CLOUDAMQP_URL,
      enableControllerDiscovery: true,
    }),
  ],
  exports: [RabbitMQModule],
})
export class RabbitmqGlobalModule {}
