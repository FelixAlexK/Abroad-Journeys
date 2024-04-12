import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const loginUser_Body = z
  .object({ email: z.string(), password: z.string() })
  .passthrough();
const registerUser_Body = z
  .object({
    email: z.string(),
    password: z.string(),
    last_name: z.string(),
    first_name: z.string(),
    username: z.string(),
  })
  .passthrough();
const User = z
  .object({
    user_id: z.string().optional(),
    username: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    password: z.string(),
    profile_picture: z.string().optional(),
    is_active: z.boolean().optional(),
    salt: z.string().optional(),
    session_token: z.string().optional(),
    updated_at: z.string().datetime({ offset: true }).optional(),
    created_at: z.string().datetime({ offset: true }).optional(),
    last_login: z.string().datetime({ offset: true }).optional(),
    role: z.unknown().optional(),
  })
  .passthrough();
const Post = z
  .object({
    post_id: z.string().optional(),
    title: z.string(),
    content: z.string(),
    average_rating: z.number().optional(),
    created_at: z.string().datetime({ offset: true }).optional(),
    updated_at: z.string().datetime({ offset: true }).optional(),
    state: z.unknown().optional(),
    author_id: z.string(),
  })
  .passthrough();

export const schemas = {
  loginUser_Body,
  registerUser_Body,
  User,
  Post,
};

const endpoints = makeApi([
  {
    method: "post",
    path: "/auth/login",
    alias: "loginUser",
    description: `login`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        description: `login user`,
        type: "Body",
        schema: loginUser_Body,
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal Server Error`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/auth/register",
    alias: "registerUser",
    description: `register`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        description: `register user`,
        type: "Body",
        schema: registerUser_Body,
      },
    ],
    response: User,
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal Server Error`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/posts",
    alias: "getPosts",
    description: `get all posts`,
    requestFormat: "json",
    response: z.array(Post),
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal Server Error`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/posts/:author_id",
    alias: "getPostsAuthor_id",
    requestFormat: "json",
    parameters: [
      {
        name: "author_id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Post,
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal Server Error`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/posts/:id",
    alias: "getPostsId",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Post,
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal Server Error`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/posts/new",
    alias: "postPostsnew",
    description: `create new post`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        description: `create new post`,
        type: "Body",
        schema: Post,
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal Server Error`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/users/:email",
    alias: "getUsersEmail",
    description: `get user by email`,
    requestFormat: "json",
    parameters: [
      {
        name: "email",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: User,
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal Server Error`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/users/:id",
    alias: "getUsersId",
    description: `get user by id`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: User,
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal Server Error`,
        schema: z.void(),
      },
    ],
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
