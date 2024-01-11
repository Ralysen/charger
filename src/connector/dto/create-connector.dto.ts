import { Expose, Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ConnectChargingStationDTO } from 'src/charging-station/dto/connect-charging-station.dto';

export class CreateConnectorDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  priority: boolean;

  @ValidateNested()
  @Type(() => ConnectChargingStationDTO)
  @Expose()
  @IsObject()
  @IsOptional()
  charging_station: ConnectChargingStationDTO;
}
