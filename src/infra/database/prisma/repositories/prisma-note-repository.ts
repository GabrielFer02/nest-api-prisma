import { Note } from 'src/modules/note/entities/note';
import { NoteRepository } from 'src/modules/note/repositories/note-repository';
import { PrismaService } from '../prisma.service';
import { PrismaNoteMapper } from '../mappers/prisma-note-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaNoteRepository implements NoteRepository {
  constructor(private prismaService: PrismaService) {}

  async create(note: Note): Promise<void> {
    const noteRaw = PrismaNoteMapper.toPrisma(note);

    await this.prismaService.note.create({ data: noteRaw });
  }

  async findbyId(id: string): Promise<Note | null> {
    const noteRaw = await this.prismaService.note.findUnique({ where: { id } });

    if (!noteRaw) return null;

    return PrismaNoteMapper.toDomain(noteRaw);
  }
  async delete(id: string): Promise<void> {
    await this.prismaService.note.delete({ where: { id } });
  }

  async save(note: Note): Promise<void> {
    const noteRaw = PrismaNoteMapper.toPrisma(note);

    await this.prismaService.note.update({
      data: noteRaw,
      where: { id: noteRaw.id },
    });
  }

  async findManyByUserId(
    userId: string,
    page: number,
    perPage: number,
  ): Promise<Note[]> {
    const notes = await this.prismaService.note.findMany({
      where: { userId },
      take: perPage,
      skip: (page - 1) * perPage,
    });

    return notes.map(PrismaNoteMapper.toDomain);
  }
}
