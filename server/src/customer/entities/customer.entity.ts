import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Company } from '../../companies/entities/company.entity';
import { Booking } from '../../bookings/entities/booking.entity';
@Entity()
@ObjectType()
export class Customer {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  phone?: string;

  @ManyToOne(() => Company, (company) => company.Customer, { nullable: true })
  @Field(() => Company, { nullable: true })
  company: Company;

  @OneToMany(() => Booking, (booking) => booking.customer, { nullable: true })
  @Field(() => Booking, { nullable: true })
  booking: Booking[];

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
