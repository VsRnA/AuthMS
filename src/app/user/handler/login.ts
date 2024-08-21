import httpTransport from '#infrastructure/transports/http';
import UserLoginSchema from '#app/user/schemas/login';
import { loginUser } from '../repository/login';

httpTransport.handler.post('user.user.v1.login', UserLoginSchema, async ({ payload }) => {
  const { accessToken, refreshToken } = await loginUser(payload);
  return { data: { accessToken, refreshToken } };
});
