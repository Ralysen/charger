import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ChargingStationTypeService } from './charging-station-type.service';
import { ChargingStationType } from './charging-station-type.entity';
import { CreateChargingStationTypeDTO } from './dto/create-charging-station-type.dto';
import { UpdateChargingStationTypeDTO } from './dto/update-charging-station-type.dto';

@Controller('station_type')
export class ChargingStationTypeController {
  constructor(
    private readonly chargingStationTypeService: ChargingStationTypeService,
  ) {}

  @Get()
  async findAll(): Promise<ChargingStationType[]> {
    return this.chargingStationTypeService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ChargingStationType> {
    return this.chargingStationTypeService.findById(id);
  }

  @Post()
  async create(@Body() chargingStationTypeDTO: CreateChargingStationTypeDTO) {
    await this.chargingStationTypeService.create(chargingStationTypeDTO);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.chargingStationTypeService.remove(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateChargingStationType: UpdateChargingStationTypeDTO,
  ) {
    this.chargingStationTypeService.update(id, updateChargingStationType);
  }
}
