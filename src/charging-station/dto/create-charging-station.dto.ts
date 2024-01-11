import { Expose, Type } from 'class-transformer';
import {
  IsIP,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ConnectChargingStationTypeDTO } from 'src/charging-station-type/dto/connect-charging-station-type.dto';

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

  @ValidateNested()
  @Type(() => ConnectChargingStationTypeDTO)
  @Expose()
  @IsObject()
  @IsOptional()
  station_type: ConnectChargingStationTypeDTO;
}
