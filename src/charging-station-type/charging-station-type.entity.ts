import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ChargingStationTypeCurrentType, CurrentType } from './enums/charging-station-type.current-type';
import { ChargingStation } from 'src/charging-station/charging-station.entity';

@Entity()
export class ChargingStationType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('integer')
  plug_count: number;

  @Column('float')
  efficiency: number;

  @Column({
    type: 'enum',
    enum: ChargingStationTypeCurrentType,
    default: 'AC',
  })
  current_type: CurrentType;

  @OneToMany(
    () => ChargingStation,
    (chargingStation) => chargingStation.station_type,
  )
  charging_stations: ChargingStation[];
}
