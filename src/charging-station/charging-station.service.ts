import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChargingStation } from './charging-station.entity';
import { Repository } from 'typeorm';
import { CreateChargingStationDTO } from './dto/create-charging-station.dto';
import { UpdateChargingStationDTO } from './dto/update-charging-station.dto';

@Injectable()
export class ChargingStationService {
    constructor(
        @InjectRepository(ChargingStation)
        private chargingStationRepo: Repository<ChargingStation>
    ) {}

    async findAll(): Promise<ChargingStation[]> {
        return this.chargingStationRepo.find();
    }

    async findById(id: string): Promise<ChargingStation> {
        return this.chargingStationRepo.findOneBy({ id });
    }

    async create(dto: CreateChargingStationDTO) {
        return this.chargingStationRepo.save(dto);
    }

    async remove(id: string) {
        this.chargingStationRepo.delete(id);
    }

    async update(id: string, body: UpdateChargingStationDTO) {
        let station = await this.chargingStationRepo.findOneBy({ id });
        this.chargingStationRepo.merge(station, body);
        return await this.chargingStationRepo.save(station);
    }
}
