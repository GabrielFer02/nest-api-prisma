import { UserRepositoryMemory } from 'src/modules/user/repositories/user-repository-memory';
import { ValidateUserUseCase } from './validate-user-use-case';
import { hash } from 'bcryptjs';
import { makeUser } from 'src/modules/user/factories/user-factory';
import { UnauthorizedException } from '@nestjs/common';

let userRepositoryMemory: UserRepositoryMemory;
let validateUserUseCase: ValidateUserUseCase;

describe('Validate User', () => {
  beforeEach(() => {
    userRepositoryMemory = new UserRepositoryMemory();
    validateUserUseCase = new ValidateUserUseCase(userRepositoryMemory);
  });

  it('Should be able to return user when credentials are correct', async () => {
    const userPasswordEncripted = '12134314';

    const user = makeUser({ password: await hash(userPasswordEncripted, 10) });

    userRepositoryMemory.users = [user];

    const result = await validateUserUseCase.execute({
      email: user.email,
      password: userPasswordEncripted,
    });

    expect(result).toEqual(user);
  });

  it('Should be able to throw when credentials incorrect', async () => {
    const userPasswordEncripted = '12134314';

    const user = makeUser({ password: await hash(userPasswordEncripted, 10) });

    userRepositoryMemory.users = [user];

    expect(async () => {
      await validateUserUseCase.execute({
        email: 'incorrect@gmail.com',
        password: userPasswordEncripted,
      });
    }).rejects.toThrow(UnauthorizedException);

    expect(async () => {
      await validateUserUseCase.execute({
        email: user.email,
        password: 'incorrect password',
      });
    }).rejects.toThrow(UnauthorizedException);
  });
});
