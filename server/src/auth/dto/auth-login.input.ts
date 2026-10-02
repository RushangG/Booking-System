import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class AuthLoginInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
