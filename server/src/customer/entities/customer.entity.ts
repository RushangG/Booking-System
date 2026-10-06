import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Booking } from '../../bookings/entities/booking.entity';
import { CustomerCompany } from '../../customer-companies/entities/customer-company.entity';
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

  @OneToMany(
    () => CustomerCompany,
    (customerCompany) => customerCompany.Customer,
    { nullable: true },
  )
  @Field(() => [CustomerCompany], { nullable: true })
  customerCompanies: CustomerCompany[];

  @OneToMany(() => Booking, (booking) => booking.customer, { nullable: true })
  @Field(() => Booking, { nullable: true })
  booking: Booking[];

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
