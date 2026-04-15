import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const REQUIRED_ENV_VARS = [
  "BASE_URL",
  "DEMO_USER_EMAIL",
  "DEMO_USER_PASSWORD",
  "DEMO_USER_DISPLAY_NAME",
] as const;

for (const name of REQUIRED_ENV_VARS) {
  if (!process.env[name]) {
    throw new Error(
      `Environment variable "${name}" is not set or is empty. ` +
        `Check your .env file or environment configuration.`,
    );
  }
}

export const env = {
  BASE_URL: process.env.BASE_URL as string,
  DEMO_USER_EMAIL: process.env.DEMO_USER_EMAIL as string,
  DEMO_USER_PASSWORD: process.env.DEMO_USER_PASSWORD as string,
  DEMO_USER_DISPLAY_NAME: process.env.DEMO_USER_DISPLAY_NAME as string,
};
