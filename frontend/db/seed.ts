import { db, Comment, Author, Likes, Post } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Author).values([
    {
      authorId: 1,
      name: "Felix Kuhbier",
      email: "felix.kuhbier@gmx.de",
      password: "password",
      salt: null,
    },
    {
      authorId: 2,
      name: "Hans",
      email: "hans@gmx.de",
      password: "password",
      salt: null,
    },
  ]);
  await db.insert(Post).values([
    {
      postId: 1,
      body: "My First Post",
      title: "First Post",
      status: "published",
      publishedAt: null,
      authorId: 1,
    },
    {
      postId: 2,
      body: "My Second Post",
      title: "Second Post",
      status: "published",
      publishedAt: null,
      authorId: 2,
    },
  ]);
  await db.insert(Likes).values([
    { likeId: 1, amount: 20, postId: 1 },
    { likeId: 2, amount: 10000, postId: 2 },
  ]);

  await db.insert(Comment).values([
    {
      authorId: 1,
      content: "Hello World",
      commentId: 1,
      publishedAt: null,
      author: "Felix",
      postId: 1,
    },
    {
      authorId: 2,
      content: "Moin Meister",
      commentId: 2,
      publishedAt: null,
      author: "Joachim",
      postId: 2,
    },
    {
      authorId: 1,
      content: "Super Cool",
      commentId: 3,
      publishedAt: null,
      author: "Felix",
      postId: 1,
    },
  ]);
}
