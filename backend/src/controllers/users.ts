import express from "express";
import { getUsers, getUserById, getUserBySessionToken } from "../model/userModel";
import { HttpStatusCodes } from "../helpers/HttpHelper";
import { SESSION_TOKEN } from "../constants";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const sessionToken = req.cookies[SESSION_TOKEN];
    

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const user = await getUserBySessionToken(sessionToken);
    
    if (user?.role === "BASIC") {
      return res.sendStatus(HttpStatusCodes["forbidden"]);
    }
    const users = await getUsers();

    return res.status(200).json(users).end();
  } catch (error) {
    return res.sendStatus(400);
  }
};
