import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class VerifyAccessTokenResponse {
  @Field()
  sub: number;

  @Field()
  email: string;

  @Field(() => [String])
  roles: string[];

  @Field(() => [String])
  permissions: string[];

  @Field()
  iat: number;

  @Field()
  exp: number;
}


