import UpdateSchema from '#app/user/schemas/update';
import httpTransport from '#infrastructure/transports/http';
import { getUser } from '../repository/get';
import { updateUser } from '../repository/update';

httpTransport.handler.post('user.user.v1.update', UpdateSchema, async ({ query, payload }) => {
  const user = await getUser(query);
  const updatedUser = { ...user, ...payload };
  await updateUser(query, updatedUser);
  return { data: updatedUser };
});
