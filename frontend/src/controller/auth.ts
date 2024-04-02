import { db, Comment, Author, Post, eq, Likes } from "astro:db";
import { getAuthorByEmail } from "./author";

export const login = async (email: string, password: string) => {
  const author = await getAuthorByEmail(email);
  if (!author) {
    console.error("No Author");
  }
};
