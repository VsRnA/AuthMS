import { plainify } from '#common/types/sequelize';
import { WhereOptions } from 'sequelize';
import User, { UserAttributes } from '../models/user';

export type UserQuery = {
  /** Id искомого пользователя */
  id?: UserAttributes['id']
  /** email искомого пользователя */
  email?: UserAttributes['email']
}

export async function findUser(query: UserQuery) {
  const where: WhereOptions<User> = {};

  if (query.id) where.id = query.id;
  if (query.email) where.email = query.email;

  return plainify(User.findOne({ where }));
}
