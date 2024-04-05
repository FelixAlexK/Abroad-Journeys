import {
  pgTable,
  text,
  date,
  boolean,
  uuid,
  pgEnum,
  uniqueIndex,
  unique,
} from "drizzle-orm/pg-core";

export const UserRole = pgEnum("userRole", ["ADMIN", "BASIC"]);

export const UserTable = pgTable(
  "users",
  {
    user_id: uuid("user_id").primaryKey().defaultRandom(),
    username: text("username").notNull(),
    email: text("email").notNull(),
    profile_picture: text("profile_picture"),
    first_name: text("first_name").notNull(),
    last_name: text("last_name").notNull(),
    created_at: date("created_at", { mode: "string" }),
    updated_at: date("updated_at", { mode: "string" }),
    last_login: date("last_login", { mode: "string" }),
    is_active: boolean("is_active"),
    password: text("password").notNull(),
    salt: text("salt"),
    session_token: text("sessionToken"),
    role: UserRole("userRole").default("BASIC").notNull(),
  },
  (users) => {
    return {
      usernameIdx: uniqueIndex("usernameIdx").on(users.username),
      emailIdx: uniqueIndex("emailIdx").on(users.email),
      uniqueUsernameAndEmail: unique("uniqueUsernameAndEmail").on(
        users.username,
        users.email
      ),
    };
  }
);
