import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LocalStrategy } from 'src/modules/auth/strategies/local.strategy';
import { ValidateUserUseCase } from 'src/modules/auth/UseCases/validate-user-use-case';
import { UserModule } from '../user/user.module';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [AuthController],
  providers: [LocalStrategy, ValidateUserUseCase],
})
export class AuthModule {}
