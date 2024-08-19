import User, { UserAttributes } from '#app/user/models/user';
import { WhereOptions } from 'sequelize';

type Query = {
    /** Id обновления пользователя */
    guid?: UserAttributes['guid']
}

type Data = Partial<UserAttributes>;

export async function updateUser(query: Query, userData: Data) {
  const where: WhereOptions<User> = { guid: query.guid };

  await User.update(userData, { where });
}
