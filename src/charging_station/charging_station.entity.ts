import { ChargingStationType } from "src/charging_station_type/charging_station.entity";
import { Connector } from "src/connector/connector.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne } from "typeorm";

@Entity()
export class ChargingStation {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column('uuid')
    device_id: string

    @Column()
    ip_address: string

    @Column()
    firmware_version: string

    @ManyToOne(() => ChargingStationType, (stationType) => stationType.charging_stations)
    station_type: ChargingStationType

    @OneToMany(() => Connector, (connectors) => connectors.charging_station)
    connector: Connector[]
}