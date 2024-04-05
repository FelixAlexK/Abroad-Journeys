import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();
import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: ["./src/schema/*.ts"],
  out: "./drizzle",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
  driver: "pg",
  verbose: true,
  strict: true,
}) satisfies Config;
