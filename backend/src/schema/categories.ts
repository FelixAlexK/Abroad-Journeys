import { pgTable, text, uuid, primaryKey } from "drizzle-orm/pg-core";

import { PostTable } from "./posts";

export const CategoryTable = pgTable("category", {
  category_id: uuid("category_id").primaryKey().defaultRandom(),
  name: text("title").notNull(),
});

export const PostCategoryTable = pgTable(
  "postCategory",
  {
    post_id: uuid("post_id")
      .references(() => PostTable.post_id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .notNull(),
    category_id: uuid("category_id")
      .references(() => CategoryTable.category_id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .notNull(),
  },
  (postCategory) => {
    return {
      pk: primaryKey({
        columns: [postCategory.post_id, postCategory.category_id],
      }),
    };
  }
);
