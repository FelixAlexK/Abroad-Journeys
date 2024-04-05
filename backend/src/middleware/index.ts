import express from "express";
import { SESSION_TOKEN } from "../constants";
import { getUserBySessionToken } from "../model/userModel";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies[SESSION_TOKEN];

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const result = await getUserBySessionToken(sessionToken);

    if (!result) {
      return res.sendStatus(403);
    }

    return next();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};
