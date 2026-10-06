import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { UsersHasRoles } from '../../users_has_roles/entities/users_has_roles.entity';
import { AuthSession } from '../../auth/entities/auth-session.entity';
@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @OneToMany(() => UsersHasRoles, (usersHasRoles) => usersHasRoles.User, {
    eager: true,
  })
  @Field(() => [UsersHasRoles], { nullable: true })
  usersHasRoles: UsersHasRoles[];

  @OneToMany(() => AuthSession, (authSession) => authSession.user)
  authSessions: AuthSession[];
}
