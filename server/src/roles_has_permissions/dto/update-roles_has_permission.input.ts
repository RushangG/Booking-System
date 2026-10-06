import { CreateRolesHasPermissionInput } from './create-roles_has_permission.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRolesHasPermissionInput extends PartialType(CreateRolesHasPermissionInput) {
  @Field(() => Int)
  id: number;
}
