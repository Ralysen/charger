import { ChargingStationType } from "src/charging_station_type/charging_station.entity"

export interface UpdateChargingStationDTO {
    name?: string
    device_id?: string
    ip_address?: string
    firmware_version?: string
    station_type?: ChargingStationType
}