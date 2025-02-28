import { Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { UserRepository } from 'src/modules/user/repositories/user-repository';
import { AuthValuesIncorrectException } from '../../exceptions/auth-values-incorrect-exception';

interface ValidadeUserRequest {
  email: string;
  password: string;
}

@Injectable()
export class ValidateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ email, password }: ValidadeUserRequest) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new AuthValuesIncorrectException();

    const isPasswordMatched = await compare(password, user.password);

    if (!isPasswordMatched) throw new AuthValuesIncorrectException();

    return user;
  }
}
