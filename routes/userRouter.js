import express from "express";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import userControllers from "../controllers/userControllers.js";
import validateBody from "../decorators/validateBody.js";
// import isValidId from "../middlewares/isValidId.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";
import { userUpdateSchema } from "../schemas/authSchemas.js";
import { userWaterRateSchema } from "../schemas/authSchemas.js";
import waterRateControlles from "../controllers/userControllers.js";


const userRouter = express.Router();

userRouter.get("/current", authenticate, userControllers.getCurrent);

userRouter.patch(
  "/setting",
  authenticate,
  isEmptyBody,
  validateBody(userUpdateSchema),
  userControllers.updateUser
);

userRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatarURL"),
  userControllers.updateAvatar
);


const waterRateRouter = express.Router();

waterRateRouter.use(authenticate);

waterRateRouter.patch(
  "/",
  isEmptyBody,
  validateBody(userWaterRateSchema),
  waterRateControlles.updateWaterRate
);

export default {
  userRouter,
  waterRateRouter
};
