import {
  pgTable,
  text,
  date,
  boolean,
  uuid,
  pgEnum,
  uniqueIndex,
  unique,
  timestamp,
} from "drizzle-orm/pg-core";

export const UserRole = pgEnum("user_role", ["ADMIN", "BASIC"]);

export const UserTable = pgTable(
  "users",
  {
    user_id: uuid("user_id").primaryKey().defaultRandom(),
    username: text("username").notNull(),
    email: text("email").notNull(),
    profile_picture: text("profile_picture"),
    first_name: text("first_name").notNull(),
    last_name: text("last_name").notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
    last_login: timestamp("last_login").defaultNow().notNull(),
    is_active: boolean("is_active"),
    password: text("password").notNull(),
    salt: text("salt"),
    session_token: text("session_token"),
    role: UserRole("user_role").default("BASIC").notNull(),
  },
  (users) => {
    return {
      usernameIdx: uniqueIndex("username_idx").on(users.username),
      emailIdx: uniqueIndex("email_idx").on(users.email),
      uniqueUsernameAndEmail: unique("unique_username_and_email").on(
        users.username,
        users.email
      ),
    };
  }
);

export type User = typeof UserTable.$inferSelect;
export type NewUser = typeof UserTable.$inferInsert;
