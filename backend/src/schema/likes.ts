import { pgTable, uuid, integer } from "drizzle-orm/pg-core";

import { PostTable } from "./posts";

export const LikeTable = pgTable("likes", {
  like_id: uuid("like_id").primaryKey().defaultRandom(),
  amount: integer("amount").default(0).notNull(),

  post_id: uuid("post_id")
    .references(() => PostTable.post_id, {onDelete: "cascade", onUpdate: "cascade"})
    .notNull(),
});

export type Like = typeof LikeTable.$inferSelect;
export type NewLike = typeof LikeTable.$inferInsert;
