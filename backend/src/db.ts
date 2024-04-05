/* eslint-disable prettier/prettier */
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as user from "./schema/users";
import * as post from "./schema/posts";
import * as category from "./schema/categories";
import * as comment from "./schema/comments";
import * as like from "./schema/likes";
import * as schema from "./schema";
import * as dotenv from "dotenv";
dotenv.config();
export const connection = new Pool({
  connectionString: process.env.DATABASE_URL as string,
});

export const db = drizzle(connection, {
  schema: { ...user, ...post, ...category, ...comment, ...like, ...schema },
  logger: true,
});
