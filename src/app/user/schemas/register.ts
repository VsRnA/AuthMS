import { Operation } from '#common/types/common';
import user from './compontents/user';

export default {
  title: 'Создать пользователя',

  tags: ['Пользователь'],

  request: {
    payload: {
      type: 'object',
      required: ['name', 'email', 'password'],
      properties: {
        name: user.properties.name,
        email: user.properties.email,
        password: user.properties.password,
      },
    },
  },

  response: {
    type: 'object',
    properties: {
      data: user,
    },
  },

  errors: {
    ERR_USER_ALREADY_EXISTED: 'Пользователь уже существует',
  },
} as const satisfies Operation;
