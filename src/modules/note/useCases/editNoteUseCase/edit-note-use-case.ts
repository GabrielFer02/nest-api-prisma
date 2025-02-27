import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { NoteRepository } from '../../repositories/note-repository';

interface EdiNoteRequest {
  title: string;
  description: string;
  noteId: string;
  userId: string;
}

export class EditNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ noteId, title, userId, description }: EdiNoteRequest) {
    const note = await this.noteRepository.findbyId(noteId);

    if (!note) throw new NotFoundException();

    if (note.userId !== userId) throw new UnauthorizedException();

    note.title = title;
    note.description = description ?? null;

    await this.noteRepository.save(note);

    return note;
  }
}
