import { makeUser } from 'src/modules/user/factories/user-factory';
import { NoteRepositoryInMemory } from '../../repositories/note-repository-inMemory';
import { DeleteNoteUseCase } from './delete-note-use-case';
import { makeNote } from '../../factories/makeNote';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let deleteNoteUseCase: DeleteNoteUseCase;

describe('Delete Note', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    deleteNoteUseCase = new DeleteNoteUseCase(noteRepositoryInMemory);
  });

  it('Should be able to delete note', async () => {
    const user = makeUser({});
    const note = makeNote({
      userId: user.id,
    });

    noteRepositoryInMemory.notes = [note];

    await deleteNoteUseCase.execute({ noteId: note.id, userId: user.id });

    expect(noteRepositoryInMemory.notes).toHaveLength(0);
  });

  it('Should be able to throw error when not found note', async () => {
    expect(async () => {
      await deleteNoteUseCase.execute({ noteId: 'fakeId', userId: 'fakeId' });
    }).rejects.toThrow(NotFoundException);
  });

  it('Should be able to throw error when note has another user', async () => {
    const note = makeNote({});

    noteRepositoryInMemory.notes = [note];

    expect(async () => {
      await deleteNoteUseCase.execute({ noteId: note.id, userId: 'fakeId' });
    }).rejects.toThrow(UnauthorizedException);
  });
});
