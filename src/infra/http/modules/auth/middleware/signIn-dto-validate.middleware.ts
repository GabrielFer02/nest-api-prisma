import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { SignInBody } from '../dto/signIn-body-dto';
import { validate } from 'class-validator';
import { IncorrectValuesException } from 'src/exceptions/incorrect-values-exception';
import { mapperClassValidationErrorToAppException } from 'src/utils/mapper';

@Injectable()
export class SignInDTOValidateMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    const signInBody = new SignInBody();
    signInBody.email = body.email;
    signInBody.password = body.password;

    const validations = await validate(signInBody);

    if (validations.length) {
      throw new IncorrectValuesException({
        fields: mapperClassValidationErrorToAppException(validations),
      });
    }
    next();
  }
}
