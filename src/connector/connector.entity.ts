import { ChargingStation } from 'src/charging-station/charging-station.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Connector {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  priority: boolean;

  @ManyToOne(
    () => ChargingStation,
    (charging_station) => charging_station.connector,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  charging_station: ChargingStation;
}
