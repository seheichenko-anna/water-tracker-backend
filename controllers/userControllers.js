import fs from "fs/promises";
import bcrypt from "bcrypt";

import * as authServices from "../services/authServices.js";

import * as userServices from "../services/userServices.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

import HttpError from "../helpers/HttpError.js";
import resizeIMG from "../helpers/resizeIMJ.js";
import cloudinary from "../helpers/cloudinary.js";

const getCurrent = async (req, res) => {
  const { email } = req.user;
  const user = await userServices.findUser({ email });
  res.json(user);
};

const updateUser = async (req, res) => {
  const { _id, password: oldPassword } = req.user;
  const data = req.body;
  const { newPassword, password } = req.body;

  if (password) {
    const passwordCompare = await authServices.comparePassword(
      password,
      oldPassword
    );
    if (!passwordCompare) {
      throw HttpError(401, "Password invalid");
    }
  }
  const hashPassword = await bcrypt.hash(newPassword, 10);

  const result = await userServices.updateUser(
    { _id },
    { ...data, password: hashPassword }
  );
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const updateAvatar = async (req, res) => {
  const { path: oldPath, filename } = req.file;
  await resizeIMG(oldPath, lala);
  const { url: avatarURL } = await cloudinary.uploader.upload(req.file.path, {
    folder: "avatars",
    fetch_format: "auto",
    quality: "auto",
    width: 250,
  });
  await fs.unlink(req.file.path);

  const { _id } = req.user;
  const result = await userServices.updateAvatar({ _id }, { avatarURL });
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

export default {
  getCurrent: ctrlWrapper(getCurrent),
  updateUser: ctrlWrapper(updateUser),
  updateAvatar: ctrlWrapper(updateAvatar),
};
