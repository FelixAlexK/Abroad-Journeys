import express from "express";
import { createUser, getUserByEmail, updateUserById } from "../model/userModel";
import { authentication, random } from "../helpers";
import { DOMAIN, SESSION_TOKEN } from "../constants";
import { HttpStatusCodes } from "../helpers/HttpHelper";

import { schemas } from "../validation";
export const register = async (req: express.Request, res: express.Response) => {
  try {
    const validation = schemas.registerUser_Body.safeParse(req.body);

    if (!validation.success) {
      return res.status(HttpStatusCodes["bad-request"]).json(validation.error);
    }
    const data = validation.data;

    const user = await getUserByEmail(data.email);

    if (user) {
      return res.sendStatus(HttpStatusCodes["bad-request"]);
    }

    const salt = random();
    const newUser = await createUser({
      username: data.username,
      email: data.email,
      salt: salt,
      first_name: data.first_name,
      last_name: data.last_name,
      password: authentication(salt, data.password),
    });

    return res.status(200).json(newUser).end();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const validation = schemas.loginUser_Body.safeParse(req.body);
    if (!validation.success) {
      return res.status(HttpStatusCodes["bad-request"]).json(validation.error);
    }
    const data = validation.data;
    const user = await getUserByEmail(data.email);

    if (!user) {
      return res.sendStatus(HttpStatusCodes["bad-request"]);
    }

    const expectedHash = authentication(user.salt!, data.password);

    if (user.password !== expectedHash) {
      return res.sendStatus(HttpStatusCodes["unauthorized"]);
    }

    user.session_token = authentication(random(), user.password);
    user.is_active = true;
    user.last_login = new Date(Date.now());
    const updatedUser = await updateUserById(user.user_id, user);

    res.cookie(SESSION_TOKEN, user.session_token, {
      domain: DOMAIN,
      path: "/",
      expires: new Date(Date.now() + 900000),
    });
    return res.status(200).json(updatedUser).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const logout = async (req: express.Request, res: express.Response) => {
  return res
    .status(HttpStatusCodes.ok)
    .clearCookie(SESSION_TOKEN, { path: "/", domain: DOMAIN });
};
