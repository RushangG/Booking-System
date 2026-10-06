import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRolesHasPermissionInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
