import { Expose, Type } from 'class-transformer';
import {
  IsBoolean,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ConnectChargingStationDTO } from 'src/charging-station/dto/connect-charging-station.dto';

export class UpdateConnectorDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsBoolean()
  priority?: boolean;

  @ValidateNested()
  @Type(() => ConnectChargingStationDTO)
  @Expose()
  @IsObject()
  @IsOptional()
  charging_station?: ConnectChargingStationDTO;
}
