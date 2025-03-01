import { IsEmailCustom } from 'src/infra/http/classValidator/decorators/is-email-custom';
import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/is-not-empty-custom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/is-string-custom';
import { MinLengthCustom } from 'src/infra/http/classValidator/decorators/min-length-custom';

export class CreateUserDto {
  @IsStringCustom()
  @IsEmailCustom()
  @IsNotEmptyCustom()
  email: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  name: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  @MinLengthCustom(6)
  password: string;
}
