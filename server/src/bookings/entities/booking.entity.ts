import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookingStatus } from '../../booking-status/entities/booking-status.entity';
import { User } from '../../users/entities/user.entity';
import { Accommodation } from '../../accommodations/entities/accommodation.entity';
import { Customer } from '../../customer/entities/customer.entity';

@ObjectType()
@Entity()
export class Booking {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.booking, { nullable: true })
  @Field(() => Customer, { nullable: true })
  customer: Customer;

  @ManyToOne(() => Accommodation, (accommodation) => accommodation.booking, {
    nullable: true,
  })
  @Field(() => Accommodation, { nullable: true })
  accommodation: Accommodation;

  @Field(() => Int)
  @Column()
  created_by: number;

  @Field(() => Date)
  @Column()
  check_in: Date;

  @Field(() => Date)
  @Column()
  check_out: Date;

  @Field(() => BookingStatus, { nullable: true })
  @ManyToOne(() => BookingStatus, (bookingStatus) => bookingStatus.booking, {
    nullable: true,
  })
  status: BookingStatus; 
 
  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;
}
