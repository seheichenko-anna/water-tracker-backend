import fs from "fs/promises";
import path from "path";

import * as userServices from "../services/userServices.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

import HttpError from "../helpers/HttpError.js";
import resizeIMG from "../helpers/resizeIMJ.js";

import User from "../models/User.js";

const avatarsPath = path.resolve("public", "avatars");

const getCurrent = async (req, res) => {
  const { email } = req.user;
  const user = await userServices.findUser({ email });
  res.json(user);
};

const updateUser = async (req, res) => {
  const { _id } = req.user;
  const data = req.body;
  const result = await userServices.updateUser({ _id }, { ...data });
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const updateAvatar = async (req, res) => {
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarsPath, filename);

  await resizeIMG(oldPath, newPath);
  await fs.rename(oldPath, newPath);
  const avatarURL = path.join("avatars", filename);
  const { _id } = req.user;
  const result = await userServices.updateAvatar({ _id }, { avatarURL });
  if (!result) {
    throw HttpError(404);
  }

  res.json({ avatarURL });
};

const updateWaterRate = async (req, res) => {
  const { waterRate } = req.body;
  const { _id } = req.user;

  const updatedWaterRate = await User.findByIdAndUpdate(_id, {
    waterRate: waterRate,
  });

  res.status(201).json({ waterRate: updatedWaterRate.waterRate });
};

export default {
  getCurrent: ctrlWrapper(getCurrent),
  updateUser: ctrlWrapper(updateUser),
  updateAvatar: ctrlWrapper(updateAvatar),
  updateWaterRate: ctrlWrapper(updateWaterRate)
};
