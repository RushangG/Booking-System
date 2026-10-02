import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Accommodation } from '../../accommodations/entities/accommodation.entity';

@ObjectType()
@Entity()
export class Location {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  city: string;

  @Field(() => String)
  @Column()
  state: string;

  @Field(() => String)
  @Column()
  country: string;

  @Field(() => String)
  @Column()
  address: string;

  @Field(() => [Accommodation])
  @OneToMany(() => Accommodation, (accommodation) => accommodation.location_id)
  accommodation: Accommodation[];

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;
}
