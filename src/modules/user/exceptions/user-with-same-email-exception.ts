import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/exceptions/app-exception';

export class UserWithSameEmailException extends AppException {
  constructor() {
    super({ message: 'Email already exist', status: HttpStatus.CONFLICT });
  }
}
