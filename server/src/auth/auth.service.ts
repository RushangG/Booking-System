import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthLoginInput } from './dto/auth-login.input';
import { UsersService } from '../users/users.service';
import { AuthRegisterInput } from './dto/auth-register-input';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(authLoginInput: AuthLoginInput) {
    let user = await this.usersService.findByEmail(authLoginInput.email);

    if (!user) {
      throw new BadRequestException('Invalid credentials or user not found');
    }

    const isPasswordValid = await bcrypt.compare(
      authLoginInput.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException(
        'Invalid credentials or password is incorrect',
      );
    }
    const payload = { email: user.email, sub: user.id, role: user.role };

    const accessToken = this.jwtService.sign(payload, {
      secret: String(process.env.accessSecret),
      expiresIn: '1h',
    });

    return { accessToken, user };
  }

  async register(authRegisterInput: AuthRegisterInput) {
    let existingUser = await this.usersService.findByEmail(
      authRegisterInput.email,
    );
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(authRegisterInput.password, 10);

    let newUser = await this.usersService.create({
      name: authRegisterInput.name,
      email: authRegisterInput.email,
      password: hashedPassword,
    });

    if (!newUser) {
      throw new BadRequestException('User registration failed');
    }

    return 'message: User registered successfully';
  }
}
