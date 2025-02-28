import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { NoteController } from './note.controller';
import { CreateNoteUseCase } from 'src/modules/note/useCases/createNoteUseCase/create-note-use-case';
import { DeleteNoteUseCase } from 'src/modules/note/useCases/deleteNoteUseCase.ts/delete-note-use-case';
import { EditNoteUseCase } from 'src/modules/note/useCases/editNoteUseCase/edit-note-use-case';
import { GetManyNoteUseCase } from 'src/modules/note/useCases/getManyUseCase/get-many-use-case';
import { GetNoteUseCase } from 'src/modules/note/useCases/getNoteUseCase/get-note-use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [NoteController],
  providers: [
    CreateNoteUseCase,
    EditNoteUseCase,
    DeleteNoteUseCase,
    GetNoteUseCase,
    GetManyNoteUseCase,
  ],
})
export class NoteModule {}
