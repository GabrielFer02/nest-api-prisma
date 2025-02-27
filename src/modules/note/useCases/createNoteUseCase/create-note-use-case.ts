import { Note } from '../../entities/note';
import { NoteRepository } from '../../repositories/note-repository';

interface CreateNoteRequest {
  title: string;
  description?: string;
  userId: string;
}

export class CreateNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ title, userId, description }: CreateNoteRequest) {
    const note = new Note({ title, userId, description });

    await this.noteRepository.create(note);

    return note;
  }
}
