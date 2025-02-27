import { Note } from '../entities/note';
import { NoteRepository } from './note-repository';

export class NoteRepositoryInMemory implements NoteRepository {
  notes: Note[] = [];

  async create(note: Note): Promise<void> {
    this.notes.push(note);
  }

  async findbyId(id: string): Promise<Note | null> {
    const note = this.notes.find((note) => note.id === id);

    if (!note) return null;

    return note;
  }

  async delete(id: string): Promise<void> {
    this.notes = this.notes.filter((note) => note.id !== id);
  }

  async save(note: Note): Promise<void> {
    const noteIndex = this.notes.findIndex(
      (currentNote) => currentNote.id === note.id,
    );

    if (noteIndex >= 0) this.notes[noteIndex] = note;
  }
}
