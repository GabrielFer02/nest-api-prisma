import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LocalStrategy } from 'src/modules/auth/strategies/local.strategy';
import { ValidateUserUseCase } from 'src/modules/auth/UseCases/validateUserUseCase/validate-user-use-case';
import { UserModule } from '../user/user.module';
import { DatabaseModule } from 'src/infra/database/database.module';
import { SignInDTOValidateMiddleware } from './middleware/signIn-dto-validate.middleware';
import { SignInUseCase } from 'src/modules/auth/UseCases/signInUseCase/signIn-use-case';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/modules/auth/strategies/jwt.strategy';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRE },
    }),
  ],
  controllers: [AuthController],
  providers: [LocalStrategy, JwtStrategy, ValidateUserUseCase, SignInUseCase],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SignInDTOValidateMiddleware).forRoutes('/signIn');
  }
}
