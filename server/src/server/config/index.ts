import { AppEnvironmentVariable } from './env';

interface ConfigOption {
  env: AppEnvironmentVariable;
}

interface ConfigResult {}

async function createConfig(_option: ConfigOption): Promise<ConfigResult> {
  return {};
}

export { createConfig };
