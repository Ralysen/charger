import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChargingStation } from './charging-station.entity';
import { Repository } from 'typeorm';
import { CreateChargingStationDTO } from './dto/create-charging-station.dto';
import { UpdateChargingStationDTO } from './dto/update-charging-station.dto';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChargingStationService {
  constructor(
    @InjectRepository(ChargingStation)
    private chargingStationRepo: Repository<ChargingStation>,
    private readonly amqpConnection: AmqpConnection,
    private configService: ConfigService,
  ) {}

  async findAll(): Promise<ChargingStation[]> {
    return await this.chargingStationRepo.find();
  }

  async findById(id: string): Promise<ChargingStation> {
    return await this.chargingStationRepo.findOneBy({ id });
  }

  async create(dto: CreateChargingStationDTO) {
    return await this.chargingStationRepo.save(dto);
  }

  async remove(id: string) {
    this.chargingStationRepo.delete(id);
  }

  async update(id: string, body: UpdateChargingStationDTO) {
    const station = await this.chargingStationRepo.findOneBy({ id });
    this.chargingStationRepo.merge(station, body);

    this.amqpConnection.publish(
      this.configService.get<string>('rabbitmq.exchange'),
      this.configService.get<string>('rabbitmq.routing_key'),
      {
        type: 'charging_station',
        body: station,
      },
    );

    return await this.chargingStationRepo.save(station);
  }
}
