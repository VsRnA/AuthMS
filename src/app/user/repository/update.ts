import User, { UserAttributes } from '#app/user/models/user';
import { WhereOptions } from 'sequelize';

type Query = {
    /** Id обновления пользователя */
    id: UserAttributes['id']
}

type Data = Partial<UserAttributes>;

export async function updateUser(query: Query, userData: Data) {
  const where: WhereOptions<User> = { id: query.id };

  await User.update(userData, { where });
}
