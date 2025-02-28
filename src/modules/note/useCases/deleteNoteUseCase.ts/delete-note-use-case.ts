import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../repositories/note-repository';
import { NoteNoteFoundException } from '../../exceptions/note-notFound-exception';
import { NoteWithoutPermissionException } from '../../exceptions/note-without-permission-exception';

interface DeleteNoteRequest {
  noteId: string;
  userId: string;
}

@Injectable()
export class DeleteNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ noteId, userId }: DeleteNoteRequest) {
    const note = await this.noteRepository.findbyId(noteId);

    if (!note) throw new NoteNoteFoundException();

    if (note.userId !== userId)
      throw new NoteWithoutPermissionException({ actionName: 'delete' });

    await this.noteRepository.delete(noteId);
  }
}
