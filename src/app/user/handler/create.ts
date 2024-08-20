import nats from '#infrastructure/transports/nats/natsTransport';
import { CommonError } from '#common/errors/common';
import UserRegisterSchema from '#app/user/schemas/register';
import { findUser } from '../repository/find';
import { createUser } from '../repository/create';
import getSaltedPasswordHash from '../services/getSaltedPassordHash';

nats.handler.request('user.user.v1.create', UserRegisterSchema, async ({ payload }) => {
  if (await findUser({ email: payload.email })) {
    throw new CommonError('User already existed')
      .code('ERR_USER_ALREADY_EXISTED');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...user } = await createUser({
    name: payload.name,
    email: payload.email,
    password: await getSaltedPasswordHash(payload.password),
  });

  return { data: user };
});
