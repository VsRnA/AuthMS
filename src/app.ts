import logger from '#infrastructure/logger';
import nats from '#infrastructure/transports/nats/natsTransport';
import db from '#infrastructure/db/sequelize';
import { env } from '#infrastructure/env/index';
import { bootstrap } from './bootstrap';

bootstrap(async () => {
  env.init();

  logger.console('Starting Authentication microservice');

  await db.authenticate();

  await nats.start();
});
