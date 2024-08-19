import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './migrations',
  schema: './models/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? '',
  },
  verbose: true,
  strict: true,
});