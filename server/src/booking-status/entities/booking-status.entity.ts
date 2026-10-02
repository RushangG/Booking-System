import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Booking } from '../../bookings/entities/booking.entity';

@ObjectType()
@Entity()
export class BookingStatus {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @OneToMany(() => Booking, (booking) => booking.status, { nullable: true })
  @Field(() => [Booking], { nullable: true })
  booking: Booking[];

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;
}
