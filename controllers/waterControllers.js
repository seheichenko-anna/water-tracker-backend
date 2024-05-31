import * as waterService from "../services/waterServices.js";
import * as userService from "../services/userServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import getTotalWaterForToday from "../helpers/getTotalWaterForToday.js";

const createConsumedWater = async (req, res) => {
  const { _id: owner } = req.user;
  const { amount } = req.body;

  const { totalAmount } = await getTotalWaterForToday(owner);

  if (totalAmount + amount > 5000) {
    throw HttpError(400, "Total water amount cannot exceed 5000 ml per day");
  }

  const result = await waterService.addWater({ ...req.body, owner });

  res.status(201).json(result);
};

const deleteConsumedWater = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await contactsService.removeWater({ owner, _id });

  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const updateConsumedWater = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await contactsService.updateWater({ owner, _id }, req.body);

  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const getWaterConsumptionForToday = async (req, res) => {
  const { _id: owner } = req.user;

  const user = await userService.findUser(owner);
  if (!user) {
    throw HttpError(404, "User not found");
  }

  const { totalAmount, result } = await getTotalWaterForToday(owner);

  const dailyNorm = user.waterRate * 1000;

  const percent = Math.round((totalAmount / dailyNorm) * 100);

  res.json({
    percent,
    result,
  });
};

export default {
  createConsumedWater: ctrlWrapper(createConsumedWater),
  deleteConsumedWater: ctrlWrapper(deleteConsumedWater),
  updateConsumedWater: ctrlWrapper(updateConsumedWater),
  getWaterConsumptionForToday: ctrlWrapper(getWaterConsumptionForToday),
};
