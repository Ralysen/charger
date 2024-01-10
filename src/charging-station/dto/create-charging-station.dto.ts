import { IsIP, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ChargingStationType } from 'src/charging-station-type/charging-station-type.entity';

export class CreateChargingStationDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsNotEmpty()
  device_id: string;

  @IsIP('4')
  @IsNotEmpty()
  ip_address: string;

  @IsNotEmpty()
  @IsString()
  firmware_version: string;

  station_type?: ChargingStationType;
}
