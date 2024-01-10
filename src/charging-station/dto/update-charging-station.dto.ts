import { Expose, Type } from 'class-transformer';
import {
  IsIP,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ConnectChargingStationTypeDTO } from 'src/charging-station-type/dto/connect-charging-station-type.dto';

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

  @ValidateNested()
  @Type(() => ConnectChargingStationTypeDTO)
  @Expose()
  @IsObject()
  @IsOptional()
  station_type?: ConnectChargingStationTypeDTO;
}
