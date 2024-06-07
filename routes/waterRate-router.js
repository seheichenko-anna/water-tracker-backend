import express from "express";

import { validateBody } from "../decorators/validateBody.js";

import { userWaterRateSchema } from "../schemas/authSchemas.js";

import { isEmptyBody } from "../middlewares/isEmptyBody.js";

import { authenticate } from "../middlewares/authenticate.js";

import waterRateControlles from "../controllers/waterRate-controller.js";

const waterRateRouter = express.Router();

waterRateRouter.use(authenticate);

waterRateRouter.patch(
  "/",
  isEmptyBody,
  validateBody(userWaterRateSchema),
  waterRateControlles.updateWaterRate
);

export default waterRateRouter;