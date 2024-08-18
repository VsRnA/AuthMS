import { Operation } from '#common/types/common';
import user from './compontents/user';

export default {
  title: 'Обновить пользователя',

  tags: ['Пользователь'],

  request: {
    query: {
      type: 'object',
      required: ['id'],
      properties: {
        id: user.properties.id,
      },
    },
    payload: {
      type: 'object',
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
