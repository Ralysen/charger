import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StationTypeEnum } from './support/enums/station-type.enum'
import { ChargingStation } from "src/charging-station/charging-station.entity";

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
        enum: StationTypeEnum,
        default: StationTypeEnum.AC
    })
    current_type: StationTypeEnum

    @OneToMany(() => ChargingStation, (chargingStation) => chargingStation.station_type)
    charging_stations: ChargingStation[]
}