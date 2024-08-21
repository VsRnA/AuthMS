import { JSONSchema } from '#common/types/jsonSchema';

export const schema = {
  type: 'object',
  properties: {
    PORT: {
      type: 'number',
      description: 'Порт сервера',
    },
    POSTGRES_USER: {
      type: 'string',
      description: 'Имя пользователя mysql',
    },
    POSTGRES_PASSWORD: {
      type: 'string',
      description: 'Пароль для доступа в mysql',
    },
    POSTGRES_DB: {
      type: 'string',
      description: 'Название бд mysql сервера',
    },
    POSTGRES_HOST: {
      type: 'string',
      description: 'ip адрес mysql сервера',
    },
    POSTGRES_PORT: {
      type: 'number',
      description: 'Порт mysql сервера',
    },
    PASSWORD_SALT: {
      type: 'string',
      description: 'Соль пароля',
    },
    NATS_HOST: {
      type: 'string',
      description: 'Nats host',
    },
    NATS_PORT: {
      type: 'number',
      description: 'Nats port',
    },
    JWT_SECRET: {
      type: 'string',
      description: 'JWT ключ для токена',
    },
    HTTP_HOST: {
      type: 'string',
      description: 'HTTP host',
    },
    HTTP_PORT: {
      type: 'number',
      description: 'HTTP port',
    },
  },
  required: [
    'PORT',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_DB',
    'POSTGRES_HOST',
    'POSTGRES_PORT',
    'PASSWORD_SALT',
    'NATS_HOST',
    'NATS_PORT',
    'JWT_SECRET',
  ],
} as const satisfies JSONSchema;
