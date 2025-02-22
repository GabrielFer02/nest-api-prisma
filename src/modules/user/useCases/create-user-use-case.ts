import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user-repository';
import { User } from '../entities/user';
import { hash } from 'bcryptjs';

interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: CreateUserRequest) {
    const user = new User({ ...data, password: await hash(data.password, 10) });
    await this.userRepository.create(user);

    return user;
  }
}
