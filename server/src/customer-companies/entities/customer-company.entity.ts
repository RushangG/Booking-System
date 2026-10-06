import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Company } from '../../companies/entities/company.entity';
import { Customer } from '../../customer/entities/customer.entity';

@Entity()
@ObjectType()
@Unique(['Customer', 'Company'])
export class CustomerCompany {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.customerCompanies)
  @Field(() => Customer, { nullable: true })
  Customer: Customer;

  @ManyToOne(() => Company, (company) => company.customerCompanies)
  @Field(() => Company, { nullable: true })
  Company: Company;
}
