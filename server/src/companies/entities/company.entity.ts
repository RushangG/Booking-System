import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { CustomerCompany } from '../../customer-companies/entities/customer-company.entity';
import { CompaniesHasUsers } from '../../companies-has-users/entities/companies-has-users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
@ObjectType()
export class Company {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  address: string;

  @Column()
  @Field()
  industry: string;

  @OneToMany(
    () => CustomerCompany,
    (customerCompany) => customerCompany.Company,
    { nullable: true },
  )
  @Field(() => [CustomerCompany], { nullable: true })
  customerCompanies: CustomerCompany[];

  @OneToMany(
    () => CompaniesHasUsers,
    (companiesHasUsers) => companiesHasUsers.company,
    { nullable: true },
  )
  @Field(() => [CompaniesHasUsers], { nullable: true })
  companiesHasUsers: CompaniesHasUsers[];

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp with time zone',
  })
  createdAt: Date;
}
