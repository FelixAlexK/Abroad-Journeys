import { db, Comment, Author, Post, eq, Likes } from "astro:db";

export const getAllPosts = async () => {
  return await db.select().from(Post);
};

export const getPostsWithDetails = async () => {
  return await db
    .select()
    .from(Post)
    .innerJoin(Likes, eq(Post.postId, Likes.postId))
    .innerJoin(Comment, eq(Post.postId, Comment.postId))
    .innerJoin(Author, eq(Post.authorId, Author.authorId));
};
