/* eslint-disable prettier/prettier */
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { users } from "./schema/users";
import * as dotenv from "dotenv";
import { eq } from "drizzle-orm";
dotenv.config();
export const connection = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

export const db = drizzle(connection, { schema: { users } });

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export const getUsers = async () => {
  return await db
    .select({
      user_id: users.user_id,
      username: users.username,
      email: users.email,
      profile_picture: users.profile_picture,
      first_name: users.first_name,
      last_name: users.last_name,
      created_at: users.created_at,
      updated_at: users.updated_at,
      last_login: users.last_login,
      is_active: users.is_active,
    })
    .from(users);
};
export const getUserByEmail = async (email: string) => {
  return await db.select().from(users).where(eq(users.email, email));
};
export const getUserBySessionToken = async (sessionToken: string) => {
  return await db
    .select()
    .from(users)
    .where(eq(users.sessionToken, sessionToken));
};
export const createUser = async (newUser: NewUser) => {
  return await db.insert(users).values(newUser).returning({
    user_id: users.user_id,
    username: users.username,
    email: users.email,
    profile_picture: users.profile_picture,
    first_name: users.first_name,
    last_name: users.last_name,
  });
};

export const updateUserById = async (id: number, updatedUser: User) => {
  return await db
    .update(users)
    .set(updatedUser)
    .where(eq(users.user_id, id))
    .returning({
      user_id: users.user_id,
      username: users.username,
      email: users.email,
      profile_picture: users.profile_picture,
      first_name: users.first_name,
      last_name: users.last_name,
    });
};
