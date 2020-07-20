import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/users';

interface Request {
  email: string;
  password: string;
}

interface Response {
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('E-mail or Password incorret.');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('E-mail or Password incorret.');
    }

    const token = sign({}, 'ac2fcd478a6ec055bc96b2b6922f65aa', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { token };
  }
}

export default AuthenticateUserService;
