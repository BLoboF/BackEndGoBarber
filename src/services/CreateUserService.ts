import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/users';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUseExist = await userRepository.findOne({ email });

    if (checkUseExist) {
      throw new AppError('Email address already used.');
    }

    const hashpassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashpassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
