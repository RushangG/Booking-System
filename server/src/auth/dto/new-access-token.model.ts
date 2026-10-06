import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class NewAccessToken {
  @Field(() => String)
  accessToken: string;
}
