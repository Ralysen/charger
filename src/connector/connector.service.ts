import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connector } from './connector.entity';
import { Repository } from 'typeorm';
import { CreateConnectorDTO } from './dto/create-connector.dto';
import { UpdateConnectorDTO } from './dto/update-connector.dto';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class ConnectorService {
  constructor(
    @InjectRepository(Connector)
    private connectorRepo: Repository<Connector>,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  async findAll(): Promise<Connector[]> {
    return await this.connectorRepo.find();
  }

  async findById(id: string): Promise<Connector> {
    return await this.connectorRepo.findOneBy({ id });
  }

  async create(body: CreateConnectorDTO) {
    return await this.connectorRepo.save(body);
  }

  async remove(id: string) {
    this.connectorRepo.delete(id);
  }

  async update(id: string, body: UpdateConnectorDTO) {
    const connector = await this.connectorRepo.findOneBy({ id });
    this.connectorRepo.merge(connector, body);

    this.amqpConnection.publish('exchange1', 'routing-key', { connector });

    return await this.connectorRepo.save(connector);
  }
}
