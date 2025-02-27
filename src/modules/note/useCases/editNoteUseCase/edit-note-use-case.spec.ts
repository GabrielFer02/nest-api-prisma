import { NoteRepositoryInMemory } from '../../repositories/note-repository-inMemory';
import { makeNote } from '../../factories/makeNote';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { EditNoteUseCase } from './edit-note-use-case';
import { makeUser } from 'src/modules/user/factories/user-factory';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let editNoteUseCase: EditNoteUseCase;

describe('Edit Note', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    editNoteUseCase = new EditNoteUseCase(noteRepositoryInMemory);
  });

  it('Should be able to edit note', async () => {
    const user = makeUser({});
    const note = makeNote({ userId: user.id });

    noteRepositoryInMemory.notes = [note];

    const titleChanged = 'title changed';
    const descriptionChanged = 'changed';

    await editNoteUseCase.execute({
      title: titleChanged,
      description: descriptionChanged,
      noteId: note.id,
      userId: user.id,
    });

    expect(noteRepositoryInMemory.notes[0].title).toEqual(titleChanged);
    expect(noteRepositoryInMemory.notes[0].description).toEqual(
      descriptionChanged,
    );
  });

  it('Should be able to throw error when not found note', async () => {
    expect(async () => {
      await editNoteUseCase.execute({
        title: 'blz',
        noteId: 'fakeId',
        userId: 'fakeId',
        description: 'mb aqui',
      });
    }).rejects.toThrow(NotFoundException);
  });

  it('Should be able to throw error when note has another user', async () => {
    const note = makeNote({});

    noteRepositoryInMemory.notes = [note];

    expect(async () => {
      await editNoteUseCase.execute({
        title: 'mb aqui',
        noteId: note.id,
        userId: 'fakeId',
        description: 'mbnpm',
      });
    }).rejects.toThrow(UnauthorizedException);
  });
});
