import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ChargingStationService } from './charging-station.service';
import { ChargingStation } from './charging-station.entity';
import { CreateChargingStationDTO } from './dto/create-charging-station.dto';
import { UpdateChargingStationDTO } from './dto/update-charging-station.dto';
import { IdValidationDTO } from './validation/charging-station.id-param-validation-dto';

@Controller('charging_station')
export class ChargingStationController {
  constructor(
    private readonly chargingStationService: ChargingStationService,
  ) {}

  @Get()
  async findAll(): Promise<ChargingStation[]> {
    const stations = await this.chargingStationService.findAll();

    if(!stations) {
      throw new NotFoundException('Stations not found');
    }

    return stations;
  }

  @Get(':id')
  async findById(@Param() params: IdValidationDTO): Promise<ChargingStation> {
    const station = await this.chargingStationService.findById(params.id);

    if(!station) {
      throw new NotFoundException('Station not found');
    }

    return station;
  }

  @Post()
  async create(@Body() chargingStationDTO: CreateChargingStationDTO) {
    return await this.chargingStationService.create(chargingStationDTO);
  }

  @Delete(':id')
  async remove(@Param() params: IdValidationDTO) {
    const station = await this.chargingStationService.findById(params.id);

    if(!station) {
      throw new NotFoundException('Station not found');
    }

    await this.chargingStationService.remove(params.id);
  }

  @Put(':id')
  async update(
    @Param() params: IdValidationDTO,
    @Body() updateChargingStation: UpdateChargingStationDTO,
  ) {
    const station = await this.chargingStationService.findById(params.id);

    if(!station) {
      throw new NotFoundException('Station not found');
    }

    return await this.chargingStationService.update(params.id, updateChargingStation);
  }
}
