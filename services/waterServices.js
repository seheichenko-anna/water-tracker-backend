import Water from "../models/Water.js";

export const addWater = (data) => Water.create(data);

export const removeWater = async (filter) => Water.findOneAndDelete(filter);

export const updateWater = (filter, data) =>
  Water.findOneAndUpdate(filter, data);
