import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSetting } from "./hooks.js";
import moment from "moment";

const waterSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
      max: 5000,
    },
    consumedAt: {
      type: Date,
      required: true,
      default: function () {
        return moment().toDate();
      },
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
