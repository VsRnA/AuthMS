import nats from '#infrastructure/transports/nats/natsTransport';
import UserLoginSchema from '#app/user/schemas/login';
import { loginUser } from '../repository/login';

nats.handler.request('user.user.v1.login', UserLoginSchema, async ({ payload }) => {
  const { accessToken, refreshToken } = await loginUser(payload);
  return { data: { accessToken, refreshToken } };
});
