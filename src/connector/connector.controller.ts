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
import { ConnectorService } from './connector.service';
import { Connector } from './connector.entity';
import { CreateConnectorDTO } from './dto/create-connector.dto';
import { UpdateConnectorDTO } from './dto/update-connector.dto';
import { IdValidationDTO } from './validation/connector.param.validation';
import { ResponseUtils } from 'src/response-handling/response-utils';

@Controller('connector')
export class ConnectorController {
  constructor(
    private readonly connectorService: ConnectorService,
  ) {}

  @Get()
  async findAll(): Promise<Connector[]> {
    const connectors = await this.connectorService.findAll();

    if (!connectors) {
      throw new NotFoundException('Connectors not found');
    }

    return connectors;
  }

  @Get(':id')
  async findById(@Param() params: IdValidationDTO): Promise<Connector> {
    const connector = await this.connectorService.findById(params.id);

    if (!connector) {
      throw new NotFoundException('Connector not found');
    }

    return connector;
  }

  @Post()
  async create(@Body() connectorDTO: CreateConnectorDTO) {
    const connector = await this.connectorService.create(connectorDTO);
    return ResponseUtils.sendResponse(
      201,
      `Connector ${connector.id} created successfully!`,
      connector,
    );
  }

  @Delete(':id')
  async remove(@Param() params: IdValidationDTO) {
    const station = await this.connectorService.findById(params.id);

    if (!station) {
      throw new NotFoundException('Connector not found');
    }

    try {
      await this.connectorService.remove(params.id);
      return ResponseUtils.sendResponse(
        200,
        `Connector ${params.id} removed successfully!`,
      );
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @Put(':id')
  async update(
    @Param() params: IdValidationDTO,
    @Body() updateConnectorDTO: UpdateConnectorDTO,
  ) {
    const connector = await this.connectorService.update(
      params.id,
      updateConnectorDTO,
    );

    if (!connector) {
      throw new NotFoundException('Connector not found');
    }

    return ResponseUtils.sendResponse(
      200,
      `Connector ${connector.id} updated successfully!`,
      connector,
    );
  }
}
