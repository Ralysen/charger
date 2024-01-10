import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  ChargingStationTypeCurrentType,
  CurrentType,
} from '../enums/charging-station-type.current-type';

export class CreateChargingStationTypeDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  plug_count: number;

  @IsNumber()
  @IsNotEmpty()
  efficiency: number;

  @IsEnum(ChargingStationTypeCurrentType)
  @IsNotEmpty()
  current_type: CurrentType;
}
