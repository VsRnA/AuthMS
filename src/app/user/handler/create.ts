import nats from '#infrastructure/transports/nats/natsTransport';
import CreateSchema from '#app/user/schemas/create';
import { CommonError } from '#common/errors/common';
import { findUser } from '../repository/find';
import { createUser } from '../repository/create';

nats.handler.request('user.user.v1.create', CreateSchema, async ({ payload }) => {
  const pretendent = await findUser({ email: payload.email });
  if (pretendent) {
    throw new CommonError('User already existed')
      .code('ERR_USER_ALREADY_EXISTED')
      .data(pretendent);
  }
  const user = await createUser(payload);
  return { data: user };
});
