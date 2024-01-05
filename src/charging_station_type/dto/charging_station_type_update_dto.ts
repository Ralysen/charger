import { StationCurrentType } from "../support/enums/station_current_type"

export interface UpdateChargingStationTypeDTO {
    name?: string
    plug_count?: number
    efficiency?: number
    current_type?: StationCurrentType
}