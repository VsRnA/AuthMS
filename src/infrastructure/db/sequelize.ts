import { env } from '#infrastructure/env';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  env.get('MYSQL_DATABASE'),
  env.get('MYSQL_USERNAME'),
  env.get('MYSQL_PASSWORD'),
  {
    host: env.get('MYSQL_HOST'),
    port: env.get('MYSQL_PORT'),
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',
    },
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
  },
);

export default sequelize;
