import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../repositories/note-repository';

interface GetManyNoteRequest {
  userId: string;
  page?: string;
  perPage?: string;
}

@Injectable()
export class GetManyNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ userId, page, perPage }: GetManyNoteRequest) {
    const DEFAULT_PAGE = 1;
    const DEFAULT_PER_PAGE = 20;

    const currentPage = Number(page) || DEFAULT_PAGE;
    const currentPerPage = Number(perPage) || DEFAULT_PER_PAGE;

    const notes = await this.noteRepository.findManyByUserId(
      userId,
      currentPage,
      currentPerPage,
    );

    return notes;
  }
}
