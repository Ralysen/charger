import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import {
  ChargingStationTypeCurrentType,
  CurrentType,
} from '../enums/charging-station-type.current-type';

export class UpdateChargingStationTypeDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  plug_count?: number;

  @IsOptional()
  @IsNumber()
  efficiency?: number;

  @IsOptional()
  @IsEnum(ChargingStationTypeCurrentType)
  current_type?: CurrentType;
}
