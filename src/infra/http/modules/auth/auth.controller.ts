import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthRequestModel } from './models/auth-request-model';
import { SignInUseCase } from 'src/modules/auth/UseCases/signInUseCase/signIn-use-case';
import { localAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth-guard';

@Controller()
export class AuthController {
  constructor(private signInUseCase: SignInUseCase) {}

  @Post('signIn')
  @HttpCode(HttpStatus.OK)
  @UseGuards(localAuthGuard)
  signIn(@Request() request: AuthRequestModel) {
    const access_token = this.signInUseCase.execute({
      user: request.user,
    });

    return { access_token };
  }

  @Get('test')
  @UseGuards(JwtAuthGuard)
  test() {
    return 'teste';
  }
}
