import * as waterService from "../services/waterServices.js";
// import * as userService from "../services/userServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import moment from "moment";

const createConsumedWater = async (req, res) => {
  // const { _id: owner } = req.user;

  // const result = await waterService.addWater({ req.body, owner });

  const result = await waterService.addWater(req.body);
  res.status(201).json(result);
};

const deleteConsumedWater = async (req, res) => {
  const { id: _id } = req.params;
  // const { _id: owner } = req.user;
  // const result = await contactsService.removeWater({ owner, _id });
  const result = await waterService.removeWater({ _id });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const updateConsumedWater = async (req, res) => {
  const { id: _id } = req.params;
  // const { _id: owner } = req.user;
  // const result = await contactsService.updateWater({ owner, _id }, req.body);

  const result = await waterService.updateWater({ _id }, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const getWaterConsumptionForToday = async (req, res) => {
  const today = moment()
    .startOf("day")
    .format(
      "ddd MMM DD YYYY 00:00:00 [GMT]ZZ [(Eastern European Summer Time)]"
    );
  const tomorrow = moment()
    .endOf("day")
    .format(
      "ddd MMM DD YYYY 23:59:59 [GMT]ZZ [(Eastern European Summer Time)]"
    );
  // const { _id: owner } = req.user;
  //  const user = await userServices.findUser(owner);
  //  if (!user) {
  //     throw HttpError(404, "User not found");
  //  }

  const filter = { date: { $gte: today, $lt: tomorrow } };
  const setting = { sort: { date: "asc" } };

  const result = await waterService.getWaterPerDay({ filter, setting });

  const totalAmount = result.reduce((acc, curr) => acc + curr.amount, 0);
  //  const dailyNorm = user.waterRate * 1000;
  const dailyNorm = 1.5 * 1000;
  const percent = (totalAmount / dailyNorm) * 100;

  res.json({
    percent: `${percent.toFixed(2)}%`,
    entries: result,
  });
};

export default {
  createConsumedWater: ctrlWrapper(createConsumedWater),
  deleteConsumedWater: ctrlWrapper(deleteConsumedWater),
  updateConsumedWater: ctrlWrapper(updateConsumedWater),
  getWaterConsumptionForToday: ctrlWrapper(getWaterConsumptionForToday),
};
