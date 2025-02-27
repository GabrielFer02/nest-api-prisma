import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { CreateNoteUseCase } from 'src/modules/note/useCases/createNoteUseCase/create-note-use-case';
import { AuthenticatedRequestModel } from '../auth/models/authenticated-request-model';
import { CreateNoteBody } from './dto/create-note-body.dto';
import { NoteViewModel } from './viewModel/note-view-model';
import { EditNoteUseCase } from 'src/modules/note/useCases/editNoteUseCase/edit-note-use-case';
import { EditNoteBody } from './dto/edit-note-body.dto';
import { DeleteNoteUseCase } from 'src/modules/note/useCases/deleteNoteUseCase.ts/delete-note-use-case';
import { GetNoteUseCase } from 'src/modules/note/useCases/getNoteUseCase/get-note-use-case';
import { GetManyNoteUseCase } from 'src/modules/note/useCases/getManyUseCase/get-many-use-case';

@Controller('notes')
export class NoteController {
  constructor(
    private createNoteUseCase: CreateNoteUseCase,
    private editNoteUseCase: EditNoteUseCase,
    private deleteNoteUseCase: DeleteNoteUseCase,
    private getNoteUseCase: GetNoteUseCase,
    private getManyNotesUseCase: GetManyNoteUseCase,
  ) {}

  @Post()
  async createNote(
    @Request() request: AuthenticatedRequestModel,
    @Body() body: CreateNoteBody,
  ) {
    const { title, description } = body;

    const note = await this.createNoteUseCase.execute({
      title,
      userId: request.user.id,
      description,
    });

    return NoteViewModel.toHttp(note);
  }

  @Put(':id')
  async editNote(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') noteId: string,
    @Body() body: EditNoteBody,
  ) {
    const { title, description } = body;

    await this.editNoteUseCase.execute({
      noteId,
      title,
      userId: request.user.id,
      description,
    });
  }

  @Delete(':id')
  async deleteNote(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') noteId: string,
  ) {
    await this.deleteNoteUseCase.execute({ noteId, userId: request.user.id });
  }

  @Get(':id')
  async getNote(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') noteId: string,
  ) {
    const note = await this.getNoteUseCase.execute({
      noteId,
      userId: request.user.id,
    });

    return NoteViewModel.toHttp(note);
  }

  @Get()
  async getManyNotes(
    @Request() request: AuthenticatedRequestModel,
    @Query('page') page: string,
    @Query('perPage') perPage: string,
  ) {
    const notes = await this.getManyNotesUseCase.execute({
      userId: request.user.id,
      page,
      perPage,
    });

    return notes.map(NoteViewModel.toHttp);
  }
}
