import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StationCurrentType } from './support/enums/station_current_type'
import { ChargingStation } from "src/charging_station/charging_station.entity";

@Entity()
export class ChargingStationType {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column('integer')
    plug_count: number

    @Column('float')
    efficiency: number

    @Column({
        type: 'enum',
        enum: StationCurrentType,
        default: StationCurrentType.AC
    })
    current_type: StationCurrentType

    @OneToMany(() => ChargingStation, (chargingStation) => chargingStation.station_type)
    charging_stations: ChargingStation[]
}