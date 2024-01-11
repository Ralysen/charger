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
import { ConnectorService } from './connector.service';
import { Connector } from './connector.entity';
import { CreateConnectorDTO } from './dto/create-connector.dto';
import { UpdateConnectorDTO } from './dto/update-connector.dto';
import { IdValidationDTO } from './validation/connector.param.validation';

@Controller('connector')
export class ConnectorController {
  constructor(private readonly connectorService: ConnectorService) {}

  @Get()
  async findAll(): Promise<Connector[]> {
    const connectors = await this.connectorService.findAll();

    if(!connectors) {
      throw new NotFoundException('Connectors not found');
    }

    return connectors;
  }

  @Get(':id')
  async findById(@Param() params: IdValidationDTO): Promise<Connector> {
    const connector = await this.connectorService.findById(params.id);

    if(!connector) {
      throw new NotFoundException('Connector not found');
    }

    return connector;
  }

  @Post()
  async create(@Body() connectorDTO: CreateConnectorDTO) {
    return await this.connectorService.create(connectorDTO);
  }

  @Delete(':id')
  async remove(@Param() params: IdValidationDTO) {
    await this.connectorService.remove(params.id);
  }

  @Put(':id')
  async update(
    @Param() params: IdValidationDTO,
    @Body() updateConnectorDTO: UpdateConnectorDTO,
  ) {
    return await this.connectorService.update(params.id, updateConnectorDTO);
  }
}
