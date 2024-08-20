import jwt from 'jsonwebtoken';
import { env } from '#infrastructure/env/index';
import { UserAttributes } from '../models/user';

export type TokenPayload = {
  userGuid?: string,
  userRole: string | null,
}

export function generateToken(user: Pick<UserAttributes, 'guid' | 'role'>) {
  return jwt.sign({
    userGuid: user.guid,
    userRole: user.role,
  } satisfies TokenPayload, env.get('JWT_SECRET'));
}

export function getTokenPayload(token: string) {
  return <TokenPayload>jwt.verify(token, env.get('JWT_SECRET'));
}
