import { db } from "../db";
import { NewPost, Post, PostTable } from "../schema/posts";
import { eq } from "drizzle-orm";

// Create
export const createPost = async (new_post: NewPost) => {
  return await db.insert(PostTable).values(new_post).returning({
    post_id: PostTable.post_id,
    title: PostTable.title,
    content: PostTable.content,
    average_rating: PostTable.average_rating,
    state: PostTable.state,
    created_at: PostTable.created_at,
    updated_at: PostTable.updated_at,
  });
};

// Read

export const getAllPosts = async () => {
  return await db.query.PostTable.findMany({
    with: {
      author: {
        columns: {
          password: false,
          salt: false,
          session_token: false,
          user_id: false,
        },
      },
      like: true,
      comment: { with: { author: true } },
    },
  });
};

export const getPostsByAuthorId = async (author_id: string) => {
  return await db.query.PostTable.findMany({
    with: {
      author: {
        columns: {
          password: false,
          salt: false,
          session_token: false,
          user_id: false,
        },
      },
      like: true,
      comment: { with: { author: true } },
    },
    where: (table, funcs) => funcs.eq(table.author_id, author_id),
  });
};

// Update

export const updatePostsById = async (post_id: string, updated_post: Post) => {
  return await db
    .update(PostTable)
    .set(updated_post)
    .where(eq(PostTable.post_id, post_id))
    .returning({
      post_id: PostTable.post_id,
      title: PostTable.title,
      content: PostTable.content,
      average_rating: PostTable.average_rating,
      state: PostTable.state,
      created_at: PostTable.created_at,
      updated_at: PostTable.updated_at,
    });
};
