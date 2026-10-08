import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Company } from '../../companies/entities/company.entity';
import { User } from '../../users/entities/user.entity';

@ObjectType()
@Entity()
@Unique(['user', 'company'])
export class CompaniesHasUsers {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.companiesHasUsers)
  user: User;

  @Field(() => Company)
  @ManyToOne(() => Company, (company) => company.companiesHasUsers)
  company: Company;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;
}
