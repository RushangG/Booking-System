import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthLoginInput } from './dto/auth-login.input';
import { UsersService } from '../users/users.service';
import { AuthRegisterInput } from './dto/auth-register-input';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
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

    let accessToken = await this.generateAccessToken(user.id);

    let refreshToken = await this.generateRefreshToken(user.id);

    return { accessToken, refreshToken, user };
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

  async generatePayload(userId: number) {
    const user = await this.usersService.findOne(userId);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Extract roles from user
    let roles = user.usersHasRoles.map((userRole) => userRole.Role.name);

    // Extract permissions from user roles
    let permissions = user.usersHasRoles.flatMap((userRole) =>
      userRole.Role.rolesHasPermissions.map(
        (rolePermission) => rolePermission.Permission.permission_type,
      ),
    );

    const payload = {
      email: user.email,
      sub: user.id,
      roles: roles,
      permissions: permissions,
    };

    return payload;
  }

  async generateRefreshToken(userId: number) {
    const payload = await this.generatePayload(userId);

    const refreshToken = this.jwtService.sign(payload, {
      secret: String(this.configService.get('REFRESH_SECRET')),
      expiresIn: '7d',
    });

    return refreshToken;
  }

  async generateAccessToken(userId: number) {
    const payload = await this.generatePayload(userId);

    const accessToken = this.jwtService.sign(payload, {
      secret: String(this.configService.get('ACCESS_SECRET')),
      expiresIn: '1h',
    });

    return accessToken;
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: String(this.configService.get('REFRESH_SECRET')),
      });

      const userId = decoded.sub;

      const newAccessToken = await this.generateAccessToken(userId);

      return newAccessToken;
    } catch (error) {
      throw new BadRequestException('Invalid or expired refresh token');
    }
  }
}
