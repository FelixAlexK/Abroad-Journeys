import * as user from "./users";
import * as post from "./posts";
import * as category from "./categories";
import * as comment from "./comments";
import * as like from "./likes";
import { relations } from "drizzle-orm";

export { user };
export { post };
export { category };
export { comment };
export { like };

// RELATIONS

export const UserTableRelations = relations(user.UserTable, ({ many }) => {
  return {
    posts: many(post.PostTable),
  };
});

export const PostTableRelations = relations(post.PostTable, ({ one, many }) => {
  return {
    author: one(user.UserTable, {
      fields: [post.PostTable.author_id],
      references: [user.UserTable.user_id],
    }),
    postCategories: many(category.PostCategoryTable),
    comment: many(comment.CommentTable),
    like: one(like.LikeTable, {
      fields: [post.PostTable.post_id],
      references: [like.LikeTable.post_id],
    }),
  };
});

export const CategoryTableRelations = relations(
  category.CategoryTable,
  ({ many }) => {
    return {
      postCategories: many(category.PostCategoryTable),
    };
  }
);

export const PostCategoryTableRelations = relations(
  category.PostCategoryTable,
  ({ one }) => {
    return {
      post: one(post.PostTable, {
        fields: [category.PostCategoryTable.post_id],
        references: [post.PostTable.post_id],
      }),
      category: one(category.CategoryTable, {
        fields: [category.PostCategoryTable.category_id],
        references: [category.CategoryTable.category_id],
      }),
    };
  }
);

export const CommentTableRelations = relations(
  comment.CommentTable,
  ({ one }) => {
    return {
      author: one(user.UserTable, {
        fields: [comment.CommentTable.author_id],
        references: [user.UserTable.user_id],
      }),
      posts: one(post.PostTable, {
        fields: [comment.CommentTable.post_id],
        references: [post.PostTable.post_id],
      }),
    };
  }
);

export const LikeTableRelations = relations(like.LikeTable, ({ one }) => {
  return {
    post: one(post.PostTable, {
      fields: [like.LikeTable.post_id],
      references: [post.PostTable.post_id],
    }),
  };
});
