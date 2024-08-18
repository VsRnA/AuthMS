import { findUser, UserQuery } from '#app/user/repository/find';
import { NotFoundError } from '#common/errors/notFound';

export async function getUser(query: UserQuery) {
  const user = await findUser(query);
  if (!user) throw new NotFoundError('user');
  return user;
}
