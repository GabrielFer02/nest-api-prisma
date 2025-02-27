import { Note } from 'src/modules/note/entities/note';

export class NoteViewModel {
  static toHttp({ createdAt, description, id, title }: Note) {
    return {
      id,
      title,
      description,
      createdAt,
    };
  }
}
