import { env } from '#infrastructure/env/index';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  env.get('POSTGRES_DB'),
  env.get('POSTGRES_USER'),
  env.get('POSTGRES_PASSWORD'),
  {
    host: env.get('POSTGRES_HOST'),
    port: env.get('POSTGRES_PORT'),
    dialect: 'postgres',
    dialectOptions: {
      collate: 'ru_RU.UTF-8',
    },
    define: {
      charset: 'ru_RU.UTF-8',
    },
    logging: false,
  },
);

export default sequelize;
