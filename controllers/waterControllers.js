import * as waterService from "../services/waterServices.js";
import * as userService from "../services/userServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import getTotalWaterForToday from "../helpers/getTotalWaterForToday.js";
import moment from "moment";

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
  const result = await waterService.removeWater({ owner, _id });

  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const updateConsumedWater = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await waterService.updateWater({ owner, _id }, req.body);

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

const getWaterConsumptionPerMonth = async (req, res) => {
  const { _id: owner } = req.user;
  const { month } = req.params;

  const user = await userService.findUser(owner);
  if (!user) {
    throw HttpError(404, "User not found");
  }

  const monthMap = {
    january: "Jan",
    february: "Feb",
    march: "Mar",
    april: "Apr",
    may: "May",
    june: "Jun",
    july: "Jul",
    august: "Aug",
    september: "Sep",
    october: "Oct",
    november: "Nov",
    december: "Dec",
  };

  const monthAbbreviation = monthMap[month.toLowerCase()];

  const waterData = await waterService.getWaterPerDay({
    filter: {
      owner,
      date: {
        $regex: new RegExp(`${monthAbbreviation}`),
      },
    },
  });

  const monthIndex = Object.keys(monthMap).findIndex(
    (key) => key.toLowerCase() === month.toLowerCase()
  );
  const daysInMonth = new Date(
    new Date().getFullYear(),
    monthIndex + 1,
    0
  ).getDate();

  const result = [];

  const dailyNorm = user.waterRate * 1000;

  for (let day = 1; day <= daysInMonth; day++) {
    const date = `${day}, ${month.charAt(0).toUpperCase()}${month.slice(1)}`;
    const waterConsumption = waterData.filter(
      (data) => new Date(data.date).getDate() === day
    );
    const totalAmount = waterConsumption.reduce(
      (acc, curr) => acc + curr.amount,
      0
    );
    const percent = Math.round((totalAmount / dailyNorm) * 100);

    result.push({
      date,
      waterRate: `${dailyNorm / 1000} L`,
      percent: `${percent}%`,
      consumptionCount: waterConsumption.length,
    });
  }

  res.json(result);
};

export default {
  createConsumedWater: ctrlWrapper(createConsumedWater),
  deleteConsumedWater: ctrlWrapper(deleteConsumedWater),
  updateConsumedWater: ctrlWrapper(updateConsumedWater),
  getWaterConsumptionForToday: ctrlWrapper(getWaterConsumptionForToday),
  getWaterConsumptionPerMonth: ctrlWrapper(getWaterConsumptionPerMonth),
};
