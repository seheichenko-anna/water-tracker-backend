import express from "express";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import {
  createConsumedWaterSchema,
  updateConsumedWaterSchema,
} from "../schemas/waterSchemas.js";
import waterControllers from "../controllers/waterControllers.js";
import validateBody from "../decorators/validateBody.js";
import isValidId from "../middlewares/isValidId.js";

const waterRouter = express.Router();

waterRouter.post(
  "/",
  isEmptyBody,
  validateBody(createConsumedWaterSchema),
  waterControllers.createConsumedWater
);

waterRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(updateConsumedWaterSchema),
  waterControllers.updateConsumedWater
);

waterRouter.delete("/:id", isValidId, waterControllers.deleteConsumedWater);

export default waterRouter;
