import { IsOptional, IsUUID } from 'class-validator';

export class ConnectChargingStationDTO {
  @IsUUID()
  @IsOptional()
  id: string;
}
