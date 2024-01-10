import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ChargingStationService } from './charging-station.service';
import { ChargingStation } from './charging-station.entity';
import { CreateChargingStationDTO } from './dto/create-charging-station.dto';
import { UpdateChargingStationDTO } from './dto/update-charging-station.dto';

@Controller('charging_station')
export class ChargingStationController {
  constructor(
    private readonly chargingStationService: ChargingStationService,
  ) {}

  @Get()
  async findAll(): Promise<ChargingStation[]> {
    return await this.chargingStationService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ChargingStation> {
    return await this.chargingStationService.findById(id);
  }

  @Post()
  async create(@Body() chargingStationDTO: CreateChargingStationDTO) {
    return await this.chargingStationService.create(chargingStationDTO);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.chargingStationService.remove(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateChargingStation: UpdateChargingStationDTO,
  ) {
    return await this.chargingStationService.update(id, updateChargingStation);
  }
}
