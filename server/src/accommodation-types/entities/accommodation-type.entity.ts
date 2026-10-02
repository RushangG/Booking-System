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
export class AccommodationType {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  description: string;

  @Field(() => [Accommodation])
  @OneToMany(() => Accommodation, (accommodation) => accommodation.type_id)
  accommodations: Accommodation[];

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;
}
