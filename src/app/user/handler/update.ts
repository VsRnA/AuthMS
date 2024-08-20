import nats from '#infrastructure/transports/nats/natsTransport';
import UpdateSchema from '#app/user/schemas/update';
import { getUser } from '../repository/get';
import { updateUser } from '../repository/update';

nats.handler.request('user.user.v1.update', UpdateSchema, async ({ query, payload }) => {
  const user = await getUser(query);
  const updatedUser = { ...user, ...payload };
  await updateUser(query, updatedUser);
  return { data: updatedUser };
});
