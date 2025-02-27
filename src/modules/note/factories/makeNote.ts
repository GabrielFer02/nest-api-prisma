import { Note } from '../entities/note';

type Override = Partial<Note>;

export const makeNote = ({ id, ...override }: Override) => {
  return new Note(
    {
      title: 'blz',
      userId: '121311',
      description: 'mb aqui',
      ...override,
    },
    id,
  );
};
