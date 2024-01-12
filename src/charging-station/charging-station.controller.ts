import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
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
import { ResponseUtils } from 'src/response-handling/response-utils';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Controller('charging_station')
export class ChargingStationController {
  constructor(
    private readonly chargingStationService: ChargingStationService,
    private readonly amqpConnection: AmqpConnection
  ) {}

  @Get()
  async findAll(): Promise<ChargingStation[]> {
    const stations = await this.chargingStationService.findAll();

    if (!stations) {
      throw new NotFoundException('Stations not found');
    }
    return stations;
  }

  @Get(':id')
  async findById(@Param() params: IdValidationDTO): Promise<ChargingStation> {
    const station = await this.chargingStationService.findById(params.id);

    if (!station) {
      throw new NotFoundException('Station not found');
    }

    return station;
  }

  @Post()
  async create(@Body() chargingStationDTO: CreateChargingStationDTO) {
    const station =
      await this.chargingStationService.create(chargingStationDTO);
    return ResponseUtils.sendResponse(
      201,
      `Station ${station.id} created successfully!`,
      station,
    );
  }

  @Delete(':id')
  async remove(@Param() params: IdValidationDTO) {
    const station = await this.chargingStationService.findById(params.id);

    if (!station) {
      throw new NotFoundException('Station not found');
    }
    try {
      await this.chargingStationService.remove(params.id);
      return ResponseUtils.sendResponse(
        200,
        `Station ${params.id} removed successfully!`,
      );
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @Put(':id')
  async update(
    @Param() params: IdValidationDTO,
    @Body() updateChargingStation: UpdateChargingStationDTO,
  ) {
    const station = await this.chargingStationService.findById(params.id);

    if (!station) {
      throw new NotFoundException('Station not found');
    }
    const updatedStation = await this.chargingStationService.update(
      params.id,
      updateChargingStation,
    );
    
    this.amqpConnection.publish('exchange1', 'routing-key', { updatedStation });
    return ResponseUtils.sendResponse(
      200,
      `Station ${updatedStation.id} updated successfully!`,
      updatedStation,
    );
  }
}
