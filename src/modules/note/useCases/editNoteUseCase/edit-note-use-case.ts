import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../repositories/note-repository';
import { NoteNoteFoundException } from '../../exceptions/note-notFound-exception';
import { NoteWithoutPermissionException } from '../../exceptions/note-without-permission-exception';

interface EdiNoteRequest {
  title: string;
  description?: string;
  noteId: string;
  userId: string;
}

@Injectable()
export class EditNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ noteId, title, userId, description }: EdiNoteRequest) {
    const note = await this.noteRepository.findbyId(noteId);

    if (!note) throw new NoteNoteFoundException();

    if (note.userId !== userId)
      throw new NoteWithoutPermissionException({ actionName: 'edit' });

    note.title = title;
    note.description = description ?? null;

    await this.noteRepository.save(note);

    return note;
  }
}
