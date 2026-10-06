import { CreateUsersHasRoleInput } from './create-users_has_role.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUsersHasRoleInput extends PartialType(CreateUsersHasRoleInput) {
  @Field(() => Int)
  id: number;
}
