import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { Customer } from '../../customer/entities/customer.entity';
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

  @OneToMany(() => Customer, (customer) => customer.company)
  @Field(() => [Customer], { nullable: true })
  Customer: Customer[];

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp with time zone',
  })
  createdAt: Date;
}
