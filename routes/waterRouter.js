import express from "express";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import {
  createConsumedWaterSchema,
  updateConsumedWaterSchema,
} from "../schemas/waterSchemas.js";
import waterControllers from "../controllers/waterControllers.js";
import validateBody from "../decorators/validateBody.js";
import isValidId from "../middlewares/isValidId.js";
import authenticate from "../middlewares/authenticate.js";

const waterRouter = express.Router();
waterRouter.use(authenticate);

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

waterRouter.get("/today", waterControllers.getWaterConsumptionForToday);

export default waterRouter;
