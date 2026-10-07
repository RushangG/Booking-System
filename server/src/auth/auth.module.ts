import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AuthSessionRepository } from './auth-session.repository';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthSession } from './entities/auth-session.entity';
import { GqlAuthGuard } from './guards/gql-auth.guard';
@Global()
@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule,
    TypeOrmModule.forFeature([AuthSession]),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy, AuthSessionRepository],
  exports: [AuthService],
})
export class AuthModule {}
