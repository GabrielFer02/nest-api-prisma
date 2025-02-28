import { Note as NoteRaw } from '@prisma/client';
import { Note } from 'src/modules/note/entities/note';

export class PrismaNoteMapper {
  static toPrisma({
    createdAt,
    description,
    id,
    title,
    userId,
  }: Note): NoteRaw {
    return {
      createdAt,
      description,
      id,
      title,
      userId,
    };
  }

  static toDomain({ id, ...userData }: NoteRaw): Note {
    return new Note(
      {
        ...userData,
      },
      id,
    );
  }
}
