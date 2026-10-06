import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UsersHasRoles } from '../../users_has_roles/entities/users_has_roles.entity';
import { RolesHasPermissions } from '../../roles_has_permissions/entities/roles_has_permissions.entity';

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

  @OneToMany(() => UsersHasRoles, (usersHasRoles) => usersHasRoles.Role)
  @Field(() => [UsersHasRoles], { nullable: true })
  usersHasRoles: UsersHasRoles[];

  @OneToMany(
    () => RolesHasPermissions,
    (rolesHasPermissions) => rolesHasPermissions.Role,
  )
  @Field(() => [RolesHasPermissions], { nullable: true })
  rolesHasPermissions: RolesHasPermissions[];
}
