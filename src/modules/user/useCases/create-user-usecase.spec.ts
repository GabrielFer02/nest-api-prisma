import { compare } from 'bcryptjs';
import { UserRepositoryMemory } from '../repositories/user-repository-memory';
import { CreateUserUseCase } from './create-user-use-case';

let userRepositoryMemory: UserRepositoryMemory;
let createUserUseCase: CreateUserUseCase;

describe('CreateUser', () => {
  beforeEach(() => {
    userRepositoryMemory = new UserRepositoryMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryMemory);
  });

  it('Should be able to create user', async () => {
    expect(userRepositoryMemory.users).toEqual([]);

    const user = await createUserUseCase.execute({
      email: 'email@gmail.com',
      name: 'Gabriel',
      password: '123456',
    });

    expect(userRepositoryMemory.users).toEqual([user]);
  });

  it('Should be able to create user with password encrypted', async () => {
    const userPassword = '12345678';

    const user = await createUserUseCase.execute({
      email: 'email@gmail.com',
      name: 'Gabriel',
      password: userPassword,
    });

    const passwordEncrypted = await compare(userPassword, user.password);

    expect(passwordEncrypted).toBeTruthy();
  });
});
