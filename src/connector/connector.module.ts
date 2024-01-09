import { Module } from '@nestjs/common';
import { ConnectorService } from './connector.service';
import { ConnectorController } from './connector.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connector } from './connector.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Connector])],
  providers: [ConnectorService],
  controllers: [ConnectorController],
})
export class ConnectorModule {}
