import { drizzle } from "drizzle-orm/node-postgres";
import { db } from "../db";
import { UserTable } from "../schema/users";

export const getUserByEmail = async (email: string) => {
  return await db.query.UserTable.findFirst({
    columns: {},
    with: { posts: true },
  });
};

export const getPost = async () => {
  await db.insert(UserTable).values({
    email: "felix@email.com",
    username: "Felix",
    first_name: "Felix",
    last_name: "Kuhbier",
    password: "password",
    role: "BASIC",
    
  });
  //return await db.query.PostTable.findMany({ with: { author: true } });
};

getPost();
