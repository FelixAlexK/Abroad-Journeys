import { column, defineDb, defineTable, NOW } from "astro:db";

const Likes = defineTable({
  columns: {
    likeId: column.number({ primaryKey: true }),
    amount: column.number(),
  },
});

const Author = defineTable({
  columns: {
    authorId: column.number({ primaryKey: true }),
    name: column.text(),
  },
});

const Comment = defineTable({
  columns: {
    commentId: column.number({ primaryKey: true }),
    content: column.text(),
    publishedAt: column.date({ default: NOW }),
    authorId: column.number({ references: () => Author.columns.authorId }),
  },
});

const Post = defineTable({
  columns: {
    postId: column.number({ primaryKey: true }),
    body: column.text({ multiline: true }),
    status: column.text({ default: "draft" }),
    publishedAt: column.date(),
    author: column.text(),
    title: column.text(),
    likeId: column.number({ references: () => Likes.columns.likeId }),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { Comment },
});
