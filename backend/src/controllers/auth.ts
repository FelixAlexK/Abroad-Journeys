import express from "express";
import { createUser, getUserByEmail, updateUserById } from "../db";
import { authentication, random } from "../helpers";
import { DOMAIN, SESSION_TOKEN } from "../constants";
import { HttpStatusCodes } from "../helpers/HttpHelper";
export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { username, email, password, first_name, last_name } = req.body;

    if (!username || !email || !password) {
      return res.sendStatus(400);
    }

    const result = await getUserByEmail(email);

    if (!result || result.length > 0) {
      return res.sendStatus(400);
    }

    const salt = random();
    const user = await createUser({
      username: username,
      email: email,
      salt: salt,
      first_name: first_name,
      last_name: last_name,
      password: authentication(salt, password),
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(HttpStatusCodes["bad-request"]);
    }

    const result = await getUserByEmail(email);

    if (!result || result.length === 0) {
      return res.sendStatus(HttpStatusCodes["bad-request"]);
    }

    const user = result[0];
    const expectedHash = authentication(user.salt!, password);

    if (user.password !== expectedHash) {
      return res.sendStatus(HttpStatusCodes["bad-request"]);
    }

    user.sessionToken = authentication(random(), user.password);
    const updatedUser = await updateUserById(user.user_id, user);

    res.cookie(SESSION_TOKEN, user.sessionToken, {
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
