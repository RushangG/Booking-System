import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthLoginInput } from './dto/auth-login.input';
import { UsersService } from '../users/users.service';
import { AuthRegisterInput } from './dto/auth-register-input';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(authLoginInput: AuthLoginInput) {
    let user = await this.usersService.findByEmail(authLoginInput.email);

    if (!user || user.password !== authLoginInput.password) {
      throw new BadRequestException('Invalid credentials');
    }
    return 'Login successful';
  }

  async register(authRegisterInput: AuthRegisterInput) {

    let existingUser = await this.usersService.findByEmail(
      authRegisterInput.email,
    );
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }
    let newUser = await this.usersService.create({
      name: authRegisterInput.name,
      email: authRegisterInput.email,
      password: authRegisterInput.password,
    });

    if (!newUser) {
      throw new BadRequestException('User registration failed');
    }

    return 'message: User registered successfully';
  }

  
}
