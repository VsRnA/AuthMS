import { Operation } from '#common/types/common';
import user from './compontents/user';

export default {
  title: 'Авторизовать пользователя',

  tags: ['Пользователь'],

  request: {
    payload: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: user.properties.email,
        password: user.properties.password,
      },
    },
  },

  response: {
    type: 'object',
    properties: {
      data: {
        type: 'object',
        required: ['accessToken', 'refreshToken'],
        properties: {
          accessToken: {
            type: 'string',
          },
          refreshToken: {
            type: 'string',
          },
        },
      },
    },
  },

  errors: {
    ERR_USER_ALREADY_EXISTED: 'Пользователь уже существует',
  },
} as const satisfies Operation;
