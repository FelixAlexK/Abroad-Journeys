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
  ]);
  await db.insert(Comment).values([
    {
      authorId: 1,
      content: "Hello World",
      commentId: 1,
      publishedAt: null,
    },
  ]);

  await db.insert(Likes).values([{ likeId: 1, amount: 20 }]);

  await db.insert(Post).values([
    {
      postId: 1,
      author: "Felix Kuhbier",
      body: "My First Post",
      likeId: 1,
      title: "First Post",
      status: "published",
      publishedAt: null,
      commentId: 1,
    },
  ]);
}
