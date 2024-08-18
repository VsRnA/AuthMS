import { Operation } from '#common/types/common';
import user from './compontents/user';

export default {
  title: 'Создать пользователя',

  tags: ['Пользователь'],

  request: {
    payload: {
      type: 'object',
      required: ['name', 'email', 'imageGuid', 'role', 'metadata'],
      properties: {
        name: user.properties.name,
        email: user.properties.email,
        imageGuid: user.properties.imageGuid,
        role: user.properties.role,
        metadata: user.properties.metadata,
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
