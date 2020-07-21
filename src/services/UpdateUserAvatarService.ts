/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import UploadConfig from '../config/upload';
import User from '../models/users';
import AppError from '../errors/AppError';

interface Request {
  user_id: string;
  avatarFilename: string;
}

export default class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated user can change avatar.', 401);
    }

    if (user.avatar) {
      const userAvatarPath = path.join(UploadConfig.directory, user.avatar);

      const userAvatarPathExist = await fs.promises.stat(userAvatarPath);

      if (userAvatarPathExist) {
        await fs.promises.unlink(userAvatarPath);
      }
    }

    user.avatar = avatarFilename;

    await userRepository.save(user);

    return user;
  }
}
