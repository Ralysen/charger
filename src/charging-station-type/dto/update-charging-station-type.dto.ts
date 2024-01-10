import { CurrentType } from '../enums/charging-station-type.current-type';

export class UpdateChargingStationTypeDTO {
  name?: string;
  plug_count?: number;
  efficiency?: number;
  current_type?: CurrentType;
}
