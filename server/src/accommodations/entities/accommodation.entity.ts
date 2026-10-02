import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { AccommodationType } from '../../accommodation-types/entities/accommodation-type.entity';
import { Location } from '../../locations/entities/location.entity';
import { Booking } from '../../bookings/entities/booking.entity';
@ObjectType()
@Entity()
export class Accommodation {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @ManyToOne(
    () => AccommodationType,
    (accommodationType) => accommodationType.id,
  )
  @Field(() => AccommodationType)
  @JoinColumn({ name: 'type_id' })
  type_id: AccommodationType;

  @ManyToOne(() => Location, (location) => location.id)
  @Field(() => Location)
  @JoinColumn({ name: 'location_id' })
  location_id: Location;

  @Field(() => String)
  @Column()
  description: string;

  @Field(() => Number)
  @Column('decimal', { precision: 10, scale: 2 })
  price_per_night: number;

  @Field(() => [Booking], { nullable: true })
  @OneToMany(() => Booking, (booking) => booking.accommodation, {
    nullable: true,
  })
  booking: Booking[];

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;
}
