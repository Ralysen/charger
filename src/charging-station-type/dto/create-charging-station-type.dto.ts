import { ChargingStationTypeCurrentType } from "../enums/charging-station-type.current-type"

export class CreateChargingStationTypeDTO {
    name: string
    plug_count: number
    efficiency: number
    current_type: typeof ChargingStationTypeCurrentType
}