import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ConnectorService } from './connector.service';
import { Connector } from './connector.entity';
import { CreateConnectorDTO } from './dto/create-connector.dto';
import { UpdateConnectorDTO } from './dto/update-connector.dto';

@Controller('connector')
export class ConnectorController {
  constructor(private readonly connectorService: ConnectorService) {}

  @Get()
  async findAll(): Promise<Connector[]> {
    return await this.connectorService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Connector> {
    return await this.connectorService.findById(id);
  }

  @Post()
  async create(@Body() connectorDTO: CreateConnectorDTO) {
    return await this.connectorService.create(connectorDTO);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.connectorService.remove(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateConnectorDTO: UpdateConnectorDTO,
  ) {
    return await this.connectorService.update(id, updateConnectorDTO);
  }
}
