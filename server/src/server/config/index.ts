import { Mongoose } from 'mongoose';
import { startDbServer } from './database/mongodb';
import { AppEnvironmentVariable } from './env';

interface ConfigOption {
  env: AppEnvironmentVariable;
}

interface ConfigResult {
  db: Mongoose;
}

async function createConfig(_option: ConfigOption): Promise<ConfigResult> {
  const db = await startDbServer();
  return { db };
}

export { createConfig };
