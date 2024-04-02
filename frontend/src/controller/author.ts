import { AstroError } from "astro/errors";
import { db, Comment, Author, Post, eq, Likes, isDbError } from "astro:db";

export const getAuthorByPostId = async (postId: number) => {
  return await db
    .select({
      name: Author.name,
      email: Author.email,
      authorId: Author.authorId,
    })
    .from(Author)
    .where(eq(Author.authorId, postId))
    .all();
};

export const getAuthorByEmail = async (email: string) => {
  return await db
    .select({ author: Author })
    .from(Author)
    .where(eq(Author.email, email));
};

export const getAllAuthors = async () => {
  return await db.select().from(Author);
};
