import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ChargingStationService } from './charging_station.service';
import { ChargingStation } from './charging_station.entity';
import { CreateChargingStationDTO } from './dto/charging_station_dto';
import { UpdateChargingStationDTO } from './dto/update_charging_station_dto';


@Controller('charging-station')
export class ChargingStationController {
    constructor(private readonly chargingStationService: ChargingStationService) {}

    @Get()
    async findAll(): Promise<ChargingStation[]> {
        return this.chargingStationService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<ChargingStation> {
        return this.chargingStationService.findById(id);
    }

    @Post()
    async create(@Body() chargingStationDTO: CreateChargingStationDTO) {
        await this.chargingStationService.create(chargingStationDTO);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.chargingStationService.remove(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateChargingStation: UpdateChargingStationDTO) {
        this.chargingStationService.update(id, updateChargingStation);
    }
}
