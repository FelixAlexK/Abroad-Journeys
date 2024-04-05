import { drizzle } from "drizzle-orm/node-postgres";
import { db } from "../db";
import { UserTable, NewUser, User } from "../schema/users";
import { eq } from "drizzle-orm";

//Create

export const createUser = async (new_user: NewUser) => {
  return await db.insert(UserTable).values(new_user).returning({
    user_id: UserTable.user_id,
    username: UserTable.username,
    email: UserTable.email,
    first_name: UserTable.first_name,
    last_name: UserTable.last_name,
  });
};

// Read

export const getUserByEmail = async (email: string) => {
  return await db.query.UserTable.findFirst({
    where: (table, funcs) => funcs.eq(table.email, email),
  });
};

export const getUsers = async () => {
  return await db.query.UserTable.findMany();
};

export const getUserBySessionToken = async (session_token: string) => {
  return await db.query.UserTable.findFirst({
    where: (table, funcs) => funcs.eq(table.session_token, session_token),
  });
};
export const getUserById = async (user_id: string) => {
  return await db.query.UserTable.findFirst({
    where: (table, funcs) => funcs.eq(table.user_id, user_id),
  });
};

// Update

export const updateUserById = async (user_id: string, updated_user: User) => {
  return await db
    .update(UserTable)
    .set(updated_user)
    .where(eq(UserTable.user_id, user_id))
    .returning({
      user_id: UserTable.user_id,
      username: UserTable.username,
      email: UserTable.email,
      profile_picture: UserTable.profile_picture,
      first_name: UserTable.first_name,
      last_name: UserTable.last_name,
    });
};
