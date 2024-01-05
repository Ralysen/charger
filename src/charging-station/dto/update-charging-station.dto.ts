import { ChargingStationType } from "src/charging-station-type/charging-station-type.entity"

export class UpdateChargingStationDTO {
    name?: string
    device_id?: string
    ip_address?: string
    firmware_version?: string
    station_type?: ChargingStationType
}