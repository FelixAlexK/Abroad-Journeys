import { db } from "../db";
import { LikeTable, NewLike } from "../schema/likes";
import { eq } from "drizzle-orm";

//Create
export const createLikes = async (new_like: NewLike) => {
  return await db.insert(LikeTable).values(new_like).returning({
    amount: LikeTable.amount,
    post_id: LikeTable.post_id,
    like_id: LikeTable.like_id,
  });
};
//Read
export const getLikesByPostId = async (post_id: string) => {
  return await db.query.LikeTable.findFirst({
    with: {
      post: {
        with: {
          like: true,
        },
      },
    },
    where: (table, funcs) => funcs.eq(table.post_id, post_id),
  });
};
//Update
//Delete
