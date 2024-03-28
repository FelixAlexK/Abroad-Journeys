import {
  pgTable,
  serial,
  text,
  date,
  index,
  boolean,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    user_id: serial("user_id").primaryKey(),
    username: text("username").notNull().unique(),
    email: text("email").notNull().unique(),
    profile_picture: text("profile_picture"),
    first_name: text("first_name").notNull(),
    last_name: text("last_name").notNull(),
    created_at: date("created_at", { mode: "string" }),
    updated_at: date("updated_at", { mode: "string" }),
    last_login: date("last_login", { mode: "string" }),
    is_active: boolean("is_active"),
    password: text("password").notNull(),
    salt: text("salt"),
    sessionToken: text("sessionToken"),
  },
  (users) => {
    return {
      usernameIdx: index("username_idx").on(users.username),
      emailIdx: index("email_idx").on(users.email),
    };
  }
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
