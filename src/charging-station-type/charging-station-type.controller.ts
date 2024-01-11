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
import { ChargingStationTypeService } from './charging-station-type.service';
import { ChargingStationType } from './charging-station-type.entity';
import { CreateChargingStationTypeDTO } from './dto/create-charging-station-type.dto';
import { UpdateChargingStationTypeDTO } from './dto/update-charging-station-type.dto';
import { IdValidationDTO } from './validation/charging-station-type.param.validation';
import { ResponseUtils } from 'src/response-handling/response-utils';

@Controller('station_type')
export class ChargingStationTypeController {
  constructor(
    private readonly chargingStationTypeService: ChargingStationTypeService,
  ) {}

  @Get()
  async findAll(): Promise<ChargingStationType[]> {
    const stationTypes = await this.chargingStationTypeService.findAll();

    if (!stationTypes) {
      throw new NotFoundException('Station types not found');
    }

    return stationTypes;
  }

  @Get(':id')
  async findById(
    @Param() params: IdValidationDTO,
  ): Promise<ChargingStationType> {
    const stationType = await this.chargingStationTypeService.findById(
      params.id,
    );

    if (!stationType) {
      throw new NotFoundException('Station type not found');
    }

    return stationType;
  }

  @Post()
  async create(@Body() chargingStationTypeDTO: CreateChargingStationTypeDTO) {
    const stationType = await this.chargingStationTypeService.create(
      chargingStationTypeDTO,
    );
    return ResponseUtils.sendResponse(
      201,
      `Station type ${stationType.id} created successfully!`,
      stationType,
    );
  }

  @Delete(':id')
  async remove(@Param() params: IdValidationDTO) {
    const station = await this.chargingStationTypeService.findById(params.id);

    if (!station) {
      throw new NotFoundException('Station type not found');
    }
    try {
      await this.chargingStationTypeService.remove(params.id);
      return ResponseUtils.sendResponse(
        200,
        `Station type ${params.id} removed successfully!`,
      );
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put(':id')
  async update(
    @Param() params: IdValidationDTO,
    @Body() updateChargingStationType: UpdateChargingStationTypeDTO,
  ) {
    const stationType = await this.chargingStationTypeService.update(
      params.id,
      updateChargingStationType,
    );

    if (!stationType) {
      throw new NotFoundException('Station type not found');
    }

    return ResponseUtils.sendResponse(
      200,
      `Station type ${stationType.id} updated successfully!`,
      stationType,
    );
  }
}
