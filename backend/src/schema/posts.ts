import {
  pgTable,
  text,
  uuid,
  pgEnum,
  real,
  timestamp,
} from "drizzle-orm/pg-core";

export const postState = pgEnum("postState", ["DRAFT", "PUBLISHED"]);

import { UserTable } from "./users";

export const PostTable = pgTable("posts", {
  post_id: uuid("post_id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  average_rating: real("average_rating").notNull().default(0),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
  state: postState("postState").default("DRAFT").notNull(),
  author_id: uuid("author_id")
    .references(() => UserTable.user_id)
    .notNull(),
});
