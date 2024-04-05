import express from "express";
import { getUsers, getUserById } from "../model/userModel";
import { HttpStatusCodes } from "../helpers/HttpHelper";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.sendStatus(HttpStatusCodes["bad-request"]);
    }
    const user = await getUserById(user_id);
    if (user?.role === "BASIC") {
      return res.sendStatus(HttpStatusCodes["forbidden"]);
    }
    const users = await getUsers();

    return res.status(200).json(users).end();
  } catch (error) {
    return res.sendStatus(400);
  }
};
