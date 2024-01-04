import { ChargingStationType } from "src/charging_station_type/charging_station.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne } from "typeorm";

@Entity()
export class ChargingStation {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    device_id: string

    @Column('uuid')
    ip_address: string

    @Column()
    firmware_version: string

    @ManyToOne(() => ChargingStationType, (stationType) => stationType.charging_stations)
    station_type: ChargingStationType
}