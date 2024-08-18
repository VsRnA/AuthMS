import { plainify } from '#common/types/sequelize';
import { WhereOptions } from 'sequelize';
import User, { UserAttributes } from '../models/user';

export type UserQuery = {
  /** email искомого пользователя */
  email?: UserAttributes['email']
}

export async function findUser(query: UserQuery) {
  const where: WhereOptions<User> = {};

  if (query.email) where.email = query.email;

  return plainify(User.findOne({ where }));
}
