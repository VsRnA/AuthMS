import * as dotenv from 'dotenv';
import { schema } from './schema';
import { Env } from './env';

dotenv.config({ path: '.env' });

export const env = new Env(schema, process.env);
