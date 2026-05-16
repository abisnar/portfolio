export interface Config {
  tableName: string;
  region: string;
  corsOrigin: string;
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  const required = (key: string): string => {
    const v = env[key];
    if (!v) throw new Error(`Missing required env var: ${key}`);
    return v;
  };
  return {
    tableName: required('TABLE_NAME'),
    region: env.AWS_REGION ?? 'us-east-1',
    corsOrigin: required('CORS_ORIGIN'),
  };
}
