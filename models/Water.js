import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSetting } from "./hooks.js";

const waterSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
      max: 5000,
    },
    date: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

waterSchema.pre("findOneAndUpdate", setUpdateSetting);
waterSchema.post("save", handleSaveError);
waterSchema.post("findOneAndUpdate", handleSaveError);

const Water = model("water", waterSchema);

export default Water;
