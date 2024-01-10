import { IsOptional, IsUUID } from 'class-validator';

export class ConnectChargingStationTypeDTO {
  @IsUUID()
  @IsOptional()
  id: string;
}
