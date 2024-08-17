import { JSONSchema } from '#common/types/jsonSchema';

export const schema = {
  type: 'object',
  properties: {
    PORT: {
      type: 'number',
      description: 'Порт сервера',
    },
    MYSQL_USERNAME: {
      type: 'string',
      description: 'Имя пользователя mysql',
    },
    MYSQL_PASSWORD: {
      type: 'string',
      description: 'Пароль для доступа в mysql',
    },
    MYSQL_DATABASE: {
      type: 'string',
      description: 'Название бд mysql сервера',
    },
    MYSQL_HOST: {
      type: 'string',
      description: 'ip адрес mysql сервера',
    },
    MYSQL_PORT: {
      type: 'number',
      description: 'Порт mysql сервера',
    },
    MYSQL_DIALECT: {
      type: 'string',
      description: 'dialect',
    },
    PASSWORD_SALT: {
      type: 'string',
      description: 'Соль пароля',
    },
  },
  required: [
    'PORT',
    'MYSQL_USERNAME',
    'MYSQL_PASSWORD',
    'MYSQL_DATABASE',
    'MYSQL_HOST',
    'MYSQL_PORT',
    'MYSQL_DIALECT',
    'PASSWORD_SALT',
  ],
} as const satisfies JSONSchema;
