import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { type Response, type Request } from 'express';
import { AuthService } from './auth.service';
import { Auth } from './dto/auth.model';
import { VerifyAccessTokenResponse } from './dto/verify-acesss-token.model';
import { AuthLoginInput } from './dto/auth-login.input';
import { AuthRegisterInput } from './dto/auth-register-input';
import { Res } from '@nestjs/common';
import { NewAccessToken } from './dto/new-access-token.model';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  async login(
    @Args('authLoginInput') authLoginInput: AuthLoginInput,
    @Context('res') res: Response,
  ) {
    let result = await this.authService.login(authLoginInput);

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      path: '/',
      secure: true,
      maxAge: 604800, // 7 days in seconds
    });
    return result;
  }

  @Mutation(() => String)
  register(@Args('authRegisterInput') authRegisterInput: AuthRegisterInput) {
    return this.authService.register(authRegisterInput);
  }

  @Mutation(() => NewAccessToken)
  async refreshAccessToken(
    @Args('refreshToken') refreshToken: string,
    @Context('req') req: Request,
  ) {
    let result = await this.authService.refreshAccessToken(refreshToken);

    return {
      accessToken: result,
    };
  }

  @Mutation(() => String)
  logout() {
    return 'Logout successful';
  }
  @Mutation(() => VerifyAccessTokenResponse)
  async verifyAccessToken(@Args('accessToken') accessToken: string) {
    return this.authService.verifyAccessToken(accessToken);
  }
}
