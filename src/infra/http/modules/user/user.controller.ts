import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from 'src/modules/user/useCases/create-user-use-case';
import { CreateUserDto } from './dto/create-user.dto';
import { UserViewModel } from './viewModel/user-view-model';

@Controller('users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    const user = await this.createUserUseCase.execute({ ...body });

    return UserViewModel.toHttp(user);
  }
}
