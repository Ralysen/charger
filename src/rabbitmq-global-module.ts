import { Global, Module } from "@nestjs/common";
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Global()
@Module({
imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
        queues: [
          {
            name: 'test'
          }
        ],
        exchanges: [
          {
            name: 'exchange1',
            type: 'topic',
          },
        ],
        uri: 'amqp://localhost:5672',
        enableControllerDiscovery: true,
      }),
],
exports: [ RabbitMQModule ]
})
export class RabbitmqGlobalModule {}