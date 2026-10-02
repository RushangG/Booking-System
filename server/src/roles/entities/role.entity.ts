import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Permission } from '../../permissions/entities/permission.entity';
@Entity()
@ObjectType()
export class Role {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ unique: true })
  @Field()
  name: string;

  @Column()
  @Field()
  description: string;

  @OneToMany(() => User, (user) => user.role)
  @Field(() => [User], { nullable: true })
  users: User[];

  @OneToMany(() => Permission, (permission) => permission.role)
  @Field(() => [Permission], { nullable: true })
  permissions: Permission[];
}
