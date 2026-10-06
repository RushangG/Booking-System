import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm';
import { Permission } from '../../permissions/entities/permission.entity';
import { Role } from '../../roles/entities/role.entity';
@Entity()
@ObjectType()
@Unique(['Role', 'Permission'])
export class RolesHasPermissions {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => Role, (role) => role.rolesHasPermissions)
  @Field(() => Role, { nullable: true })
  Role: Role;

  @ManyToOne(() => Permission, (permission) => permission.rolesHasPermissions)
  @Field(() => Permission, { nullable: true })
  Permission: Permission;
}
