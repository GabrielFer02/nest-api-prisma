import { HttpStatus } from '@nestjs/common';
import { AppException, AppExceptionProps } from './app-exception';

interface IncorrectValuesExceptionProps {
  fields: AppExceptionProps['fields'];
}
export class IncorrectValuesException extends AppException {
  constructor({ fields }: IncorrectValuesExceptionProps) {
    super({
      message: 'Dados Inválidos',
      status: HttpStatus.BAD_REQUEST,
      fields,
    });
  }
}
