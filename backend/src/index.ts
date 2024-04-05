// import express from "express";
// import cors from "cors";
// import compression from "compression";
// import cookieParser from "cookie-parser";
// import bodyParser from "body-parser";
// import http from "http";
// import router from "./router";
// const app = express();

// app.use(cors({ credentials: true }));
// app.use(compression());
// app.use(cookieParser());
// app.use(bodyParser.json());
// app.use("/", router);
// const server = http.createServer(app);

// server.listen(8080, () => {
//   console.log("Server running...", server.address());
// });

import { drizzle } from "drizzle-orm/node-postgres";
import { db } from "./db";
import { UserTable } from "./schema/users";

export const getUserByEmail = async (email: string) => {
  return await db.query.UserTable.findFirst({
    columns: {},
    with: { posts: true },
  });
};

export const getPost = async () => {
  const user = await db
    .insert(UserTable)
    .values({
      email: "felix@email.com",
      username: "Felix",
      first_name: "Felix",
      last_name: "Kuhbier",
      password: "password",
    })
    .returning({ id: UserTable.user_id });

  console.log(user);
  //return await db.query.PostTable.findMany({ with: { author: true } });
};

getPost();
