import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();
import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: ["./src/schema/users.ts"],
  out: "./drizzle",
  dbCredentials: {
    host: process.env.DB_HOST!,
    port: 5432,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    ssl: false,
  },
  driver: "pg",
}) satisfies Config;
