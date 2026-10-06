import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { RolesHasPermissions } from '../../roles_has_permissions/entities/roles_has_permissions.entity';
@Entity()
@ObjectType()
export class Permission {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  permission_type: string;

  @OneToMany(
    () => RolesHasPermissions,
    (rolesHasPermissions) => rolesHasPermissions.Permission,
  )
  @Field(() => [RolesHasPermissions], { nullable: true })
  rolesHasPermissions: RolesHasPermissions[];
}
