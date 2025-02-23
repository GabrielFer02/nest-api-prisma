import { JwtService } from '@nestjs/jwt';
import { SignInUseCase } from './signIn-use-case';
import { makeUser } from 'src/modules/user/factories/user-factory';
import { UserPayload } from '../../models/user-payload';

let signInUseCase: SignInUseCase;
let jwtService: JwtService;

describe('Sign In', () => {
  beforeEach(() => {
    jwtService = new JwtService({ secret: 'secret' });
    signInUseCase = new SignInUseCase(jwtService);
  });

  it('Should be able to create access token', () => {
    const user = makeUser({});

    const token = signInUseCase.execute({ user });

    const payload = jwtService.decode(token) as UserPayload;

    expect(payload.sub).toEqual(user.id);
  });
});
