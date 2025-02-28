import { User } from 'src/modules/user/entities/user';
import { UserRepository } from 'src/modules/user/repositories/user-repository';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: User): Promise<void> {
    const userRaw = PrismaUserMapper.toPrisma(user);

    await this.prismaService.user.create({ data: userRaw });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({ where: { email } });

    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }
}
