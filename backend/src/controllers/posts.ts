import express from "express";
import {
  createPost as createPostModel,
  getAllPosts as getAllPostModel,
  getPostsByAuthorId as getPostsByAuthorIdModel,
  updatePostsById as updatePostsByIdModel,
} from "../model/postModel";
import { HttpStatusCodes } from "../helpers/HttpHelper";

import { schemas } from "../validation";
import { z } from "zod";
// Create
export const createPost = async (
  req: express.Request,
  res: express.Response
) => {
  const validation = schemas.Post.safeParse(req.body);
  if (!validation.success) {
    return res.status(HttpStatusCodes["bad-request"]).json(validation.error);
  }
  const data = validation.data;
  const post = await createPostModel({
    author_id: data.author_id,
    content: data.content,
    title: data.title,
  });

  return res.status(HttpStatusCodes["ok"]).json(post).end();
};

// Read
export const getAllPosts = async (
  req: express.Request,
  res: express.Response
) => {
  const posts = await getAllPostModel();

  return res.status(HttpStatusCodes["ok"]).json(posts).end();
};

export const getPostsByAuthorId = async (
  req: express.Request,
  res: express.Response
) => {
  const { author_id } = req.params;
  if (!author_id) {
    return res.sendStatus(HttpStatusCodes["bad-request"]);
  }

  const post = await getPostsByAuthorIdModel(author_id);

  return res.status(HttpStatusCodes["ok"]).json(post).end();
};

// Update

// export const updatePostsById = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   const { post_id } = req.body;

//   if (!post) {
//     return res.sendStatus(HttpStatusCodes["bad-request"]);
//   }

//   const updatedPost = await updatePostsByIdModel(post_id, post);

//   res.send(HttpStatusCodes["ok"]).json(updatedPost).end();
// };
