import express from "express";

import authControllers from "../controllers/authControllers.js";

import isEmptyBody from "../middlewares/isEmptyBody.js";
import upload from "../middlewares/upload.js";

import { userSigninSchema, userSignupSchema } from "../schemas/authSchemas.js";

import validateBody from "../decorators/validateBody.js";

import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  upload.single("avatar"),
  isEmptyBody,
  validateBody(userSignupSchema),
  authControllers.signup
);

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(userSigninSchema),
  authControllers.signin
);

authRouter.post("/logout", authenticate, authControllers.signout);

export default authRouter;
