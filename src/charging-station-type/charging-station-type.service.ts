import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChargingStationType } from './charging-station-type.entity';
import { Repository } from 'typeorm';
import { CreateChargingStationTypeDTO } from './dto/create-charging-station-type.dto';
import { UpdateChargingStationTypeDTO } from './dto/update-charging-station-type.dto';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class ChargingStationTypeService {
  constructor(
    @InjectRepository(ChargingStationType)
    private chargingStationTypeRepo: Repository<ChargingStationType>,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  async findAll(): Promise<ChargingStationType[]> {
    return await this.chargingStationTypeRepo.find();
  }

  async findById(id: string): Promise<ChargingStationType> {
    return await this.chargingStationTypeRepo.findOneBy({ id });
  }

  async create(dto: CreateChargingStationTypeDTO) {
    return await this.chargingStationTypeRepo.save(dto);
  }

  async remove(id: string) {
    this.chargingStationTypeRepo.delete(id);
  }

  async update(id: string, body: UpdateChargingStationTypeDTO) {
    const stationType = await this.chargingStationTypeRepo.findOneBy({ id });
    this.chargingStationTypeRepo.merge(stationType, body);

    this.amqpConnection.publish('exchange1', 'routing-key', { stationType });

    return await this.chargingStationTypeRepo.save(stationType);
  }
}
