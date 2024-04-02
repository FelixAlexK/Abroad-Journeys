import { column, defineDb, defineTable, NOW } from "astro:db";

const Likes = defineTable({
  columns: {
    likeId: column.number({ primaryKey: true }),
    amount: column.number(),
    postId: column.number({ references: () => Post.columns.postId }),
  },
});

const Author = defineTable({
  columns: {
    authorId: column.number({ primaryKey: true }),
    name: column.text(),
    email: column.text({ unique: true }),
    password: column.text(),
    salt: column.text({ optional: true }),
  },
});

const Post = defineTable({
  columns: {
    postId: column.number({ primaryKey: true }),
    body: column.text({ multiline: true }),
    status: column.text({ default: "draft" }),
    publishedAt: column.date({ default: NOW, optional: true }),
    title: column.text(),
    authorId: column.number({ references: () => Author.columns.authorId }),
  },
});

const Comment = defineTable({
  columns: {
    commentId: column.number({ primaryKey: true }),
    content: column.text(),
    author: column.text(),
    publishedAt: column.date({ default: NOW, optional: true }),
    postId: column.number({ references: () => Post.columns.postId }),
    authorId: column.number({
      references: () => Author.columns.authorId,
    }),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { Comment, Author, Post, Likes },
});
