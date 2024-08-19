import { JSONSchema } from '#common/types/jsonSchema';
import { createdAt, updatedAt, deletedAt } from '#common/schemas/sequelizeTimestamps';

export default {
  type: 'object',
  required: [
    'guid',
    'name',
    'email',
    'imageGuid',
    'role',
    'metadata',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ],
  properties: {
    guid: {
      type: 'string',
      description: 'GUID публикации',
      format: 'uuid',
    },
    name: {
      type: 'string',
      description: 'Название',
      minLength: 1,
    },
    email: {
      type: 'string',
      description: 'Название',
      format: 'email',
      minLength: 1,
    },
    imageGuid: {
      type: 'string',
      description: 'GUID изображения',
      format: 'uuid',
      nullable: true,
    },
    role: {
      description: 'Тип',
      enum: ['user', 'admin'],
    },
    password: {
      type: 'string',
      description: 'Пароль',
      minLength: 1,
    },
    metadata: {
      type: 'object',
      description: 'Дополнительные данные',
    },
    createdAt,
    updatedAt,
    deletedAt,
  },
} as const satisfies JSONSchema;
