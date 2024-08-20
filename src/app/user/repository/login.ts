import { CommonError } from '#common/errors/common';
import bcrypt from 'bcrypt';
import { UserAttributes } from '../models/user';
import getSaltedPassordHash from '../services/getSaltedPassordHash';
import { getUser } from './get';
import { generateToken } from '../services/generateToken';

export async function loginUser(payload: Pick<UserAttributes, 'email' | 'password'>) {
  const user = await getUser({ email: payload.email });

  if (!bcrypt.compare(getSaltedPassordHash(payload.password), user.password)) {
    throw new CommonError('Passwords don`t match')
      .code('ERR_USER_PASSWORD_NOT_MATCH');
  }
  const { guid, role } = { ...user };

  return {
    accessToken: generateToken({ guid, role }),
    refreshToken: 'refreshToken',
  };
}
