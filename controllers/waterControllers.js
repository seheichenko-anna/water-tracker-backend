import * as waterService from "../services/waterServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

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

export default {
  createConsumedWater: ctrlWrapper(createConsumedWater),
  deleteConsumedWater: ctrlWrapper(deleteConsumedWater),
  updateConsumedWater: ctrlWrapper(updateConsumedWater),
};
