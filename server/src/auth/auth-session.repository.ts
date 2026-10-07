import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthSession } from './entities/auth-session.entity';

@Injectable()
export class AuthSessionRepository extends Repository<AuthSession> {
  constructor(
    @InjectRepository(AuthSession)
    private readonly authSessionRepo: Repository<AuthSession>,
  ) {
    super(authSessionRepo.target, authSessionRepo.manager);
  }
}
