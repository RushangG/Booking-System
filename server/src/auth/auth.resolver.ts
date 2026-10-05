import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { AuthLoginInput } from './dto/auth-login.input';
import { AuthRegisterInput } from './dto/auth-register-input';
@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  login(@Args('authLoginInput') authLoginInput: AuthLoginInput) {
    return this.authService.login(authLoginInput);
  }

  @Mutation(() => String)
  register(@Args('authRegisterInput') authRegisterInput: AuthRegisterInput) {
    return this.authService.register(authRegisterInput);
  }

  @Mutation(() => String)
  logout() {
    return 'Logout successful';
  }
}
