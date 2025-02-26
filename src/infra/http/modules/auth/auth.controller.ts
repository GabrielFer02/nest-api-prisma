import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthRequestModel } from './models/auth-request-model';
import { SignInUseCase } from 'src/modules/auth/UseCases/signInUseCase/signIn-use-case';
import { localAuthGuard } from './guards/local-auth.guard';
import { Public } from './decorators/is-public';

@Controller()
export class AuthController {
  constructor(private signInUseCase: SignInUseCase) {}

  @Post('signIn')
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(localAuthGuard)
  signIn(@Request() request: AuthRequestModel) {
    const access_token = this.signInUseCase.execute({
      user: request.user,
    });

    return { access_token };
  }
}
