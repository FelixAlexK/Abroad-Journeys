import { db, Comment, Author, Post, eq, Likes } from "astro:db";

export const getCommentsOfPost = async (postId: number) => {
  return await db
    .select()
    .from(Comment)
    .where(eq(Comment.postId, postId)) // Filter comments by postId
    .innerJoin(Author, eq(Comment.authorId, Author.authorId))
    .all(); // Join with Author table
};
