import { JSONSchema } from '#common/types/jsonSchema';
import { createdAt, updatedAt, deletedAt } from '#common/schemas/sequelizeTimestamps';

export default {
  type: 'object',
  required: [
    'id',
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
    id: {
      type: 'number',
      description: 'ID публикации',
      minimum: 1,
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
    metadata: {
      type: 'object',
      description: 'Дополнительные данные',
    },
    createdAt,
    updatedAt,
    deletedAt,
  },
} as const satisfies JSONSchema;
