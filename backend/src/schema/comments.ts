import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";

import { PostTable } from "./posts";
import { UserTable } from "./users";

export const CommentTable = pgTable("comments", {
  comment_id: uuid("comment_id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),

  post_id: uuid("post_id")
    .references(() => PostTable.post_id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),

  author_id: uuid("author_id")
    .references(() => UserTable.user_id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    })
    .notNull(),
});
