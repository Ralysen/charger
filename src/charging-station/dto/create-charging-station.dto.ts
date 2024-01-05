import { ChargingStationType } from "src/charging-station-type/charging-station-type.entity"

export interface CreateChargingStationDTO {
    name: string
    device_id: string
    ip_address: string
    firmware_version: string
    station_type?: ChargingStationType
}