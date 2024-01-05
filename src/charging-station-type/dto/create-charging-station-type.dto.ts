import { StationTypeEnum } from "../support/enums/station-type.enum"

export class CreateChargingStationTypeDTO {
    name: string
    plug_count: number
    efficiency: number
    current_type: StationTypeEnum
}