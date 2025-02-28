import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/exceptions/app-exception';

interface NoteWithoutPermissionExceptionProps {
  actionName: string;
}

export class NoteWithoutPermissionException extends AppException {
  constructor({ actionName }: NoteWithoutPermissionExceptionProps) {
    super({
      message: `No have permission to ${actionName} note`,
      status: HttpStatus.UNAUTHORIZED,
    });
  }
}
