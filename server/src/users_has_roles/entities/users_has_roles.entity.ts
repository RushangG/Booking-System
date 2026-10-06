import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Role } from '../../roles/entities/role.entity';
@Entity()
@ObjectType()
@Unique(['User', 'Role'])
export class UsersHasRoles {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => User, (user) => user.usersHasRoles)
  @Field(() => User, { nullable: true })
  User: User;

  @ManyToOne(() => Role, (role) => role.usersHasRoles)
  @Field(() => Role, { nullable: true })
  Role: Role;
}
