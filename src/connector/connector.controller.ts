import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ConnectorService } from './connector.service';
import { Connector } from './connector.entity';
import { CreateConnectorDTO } from './dto/connector_create_dto';
import { UpdateConnectorDTO } from './dto/connector_update_dto';

@Controller('connector')
export class ConnectorController {
    constructor(private readonly connectorService: ConnectorService) {}

    @Get()
    async findAll(): Promise<Connector[]> {
        return this.connectorService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<Connector> {
        return this.connectorService.findById(id);
    }

    @Post()
    async create(@Body() connectorDTO: CreateConnectorDTO) {
        await this.connectorService.create(connectorDTO);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.connectorService.remove(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateConnectorDTO: UpdateConnectorDTO) {
        this.connectorService.update(id, updateConnectorDTO);
    }
}
