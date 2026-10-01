import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';

@Entity()
@ObjectType()
export class Permission {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  permission_type: string;

  @ManyToOne(() => Role, (role) => role.permissions)
  @Field(() => Role)
  role: Role;
}
