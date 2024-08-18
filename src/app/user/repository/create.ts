import { plainify } from '#common/types/sequelize';
import { CreationAttributes } from 'sequelize';
import User from '#app/user/models/user';

export async function createUser(userData: CreationAttributes<User>) {
  return plainify(User.create(userData));
}
