import express from "express";
import { login, register } from "../controllers/auth";
import { getAllUsers } from "../controllers/users";
import { isAuthenticated } from "../middleware";

const router = express.Router();
const BASE_URL_V1 = "/api/v1";
router.post(BASE_URL_V1 + "/auth/register", register);
router.post(BASE_URL_V1 + "/auth/login", login);
router.get(BASE_URL_V1 + "/users", isAuthenticated, getAllUsers);
export default router;
