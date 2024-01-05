import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChargingStationType } from './charging_station.entity';
import { Repository } from 'typeorm';
import { CreateChargingStationTypeDTO } from './dto/charging_station_type_create_dto';
import { UpdateChargingStationTypeDTO } from './dto/charging_station_type_update_dto';

@Injectable()
export class ChargingStationTypeService {
    constructor(
        @InjectRepository(ChargingStationType)
        private chargingStationTypeRepo: Repository<ChargingStationType>
    ) {}

    async findAll(): Promise<ChargingStationType[]> {
        return this.chargingStationTypeRepo.find();
    }

    async findById(id: string): Promise<ChargingStationType> {
        return this.chargingStationTypeRepo.findOneBy({ id });
    }

    async create(dto: CreateChargingStationTypeDTO) {
        return this.chargingStationTypeRepo.save(dto);
    }

    async remove(id: string) {
        this.chargingStationTypeRepo.delete(id);
    }

    async update(id: string, body: UpdateChargingStationTypeDTO) {
        let stationType = await this.chargingStationTypeRepo.findOneBy({ id });
        this.chargingStationTypeRepo.merge(stationType, body);
        return await this.chargingStationTypeRepo.save(stationType);
    }
}
