import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connector } from './connector.entity';
import { privateDecrypt } from 'crypto';
import { Repository } from 'typeorm';
import { CreateConnectorDTO } from './dto/connector_create_dto';
import { UpdateConnectorDTO } from './dto/connector_update_dto';

@Injectable()
export class ConnectorService {
    constructor(
        @InjectRepository(Connector)
        private connectorRepo: Repository<Connector>
    ) {}

    async findAll(): Promise<Connector[]> {
        return this.connectorRepo.find();
    }

    async findById(id: string): Promise<Connector> {
        return this.connectorRepo.findOneBy({ id });
    }

    async create(body: CreateConnectorDTO) {
        return this.connectorRepo.save(body);
    }

    async remove(id: string) {
        this.connectorRepo.delete(id);
    }

    async update(id: string, body: UpdateConnectorDTO) {
        let connector = await this.connectorRepo.findOneBy({ id });
        this.connectorRepo.merge(connector, body);
        return await this.connectorRepo.save(connector);
    }
}
