import {
    pgTable,
    uuid,
    integer,
  } from "drizzle-orm/pg-core";
  
  import { PostTable } from "./posts";
  
  export const LikeTable = pgTable("likes", {
    like_id: uuid("like_id").primaryKey().defaultRandom(),
    amount: integer("amount").default(0).notNull(),
  
    post_id: uuid("post_id")
      .references(() => PostTable.post_id)
      .notNull(),
  
    
  });
  