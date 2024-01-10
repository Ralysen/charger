import { IsIP, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';
import { ChargingStationType } from 'src/charging-station-type/charging-station-type.entity';

export class UpdateChargingStationDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUUID()
  device_id?: string;

  @IsOptional()
  @IsIP(4)
  ip_address?: string;

  @IsOptional()
  @IsString()
  firmware_version?: string;

  @IsOptional()
  @IsObject()
  station_type?: ChargingStationType;
}
