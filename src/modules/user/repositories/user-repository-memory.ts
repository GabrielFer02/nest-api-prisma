import { User } from '../entities/user';
import { UserRepository } from './user-repository';

export class UserRepositoryMemory extends UserRepository {
  users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);

    if (!user) return null;
    return user;
  }
}
