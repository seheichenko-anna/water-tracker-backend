import * as waterService from "../services/waterServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import moment from "moment";

const createConsumedWater = async (req, res) => {
  // const { _id: owner } = req.user;

  const { amount, time } = req.body;

  const date = moment().format("YYYY-MM-DD");
  const consumedAt = moment.utc(`${date}T${time}`).toDate();
  // const result = await waterService.addWater({ amount, consumedAt, owner });

  const result = await waterService.addWater({ amount, consumedAt });
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
  // const result = await contactsService.updateWater({ owner, _id }, amount, consumedAt);
  const { amount, time } = req.body;

  const date = moment().format("YYYY-MM-DD");
  const consumedAt = moment.utc(`${date}T${time}`).toDate();
  const result = await waterService.updateWater({ _id }, amount, consumedAt);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

export default {
  createConsumedWater: ctrlWrapper(createConsumedWater),
  deleteConsumedWater: ctrlWrapper(deleteConsumedWater),
  updateConsumedWater: ctrlWrapper(updateConsumedWater),
};
