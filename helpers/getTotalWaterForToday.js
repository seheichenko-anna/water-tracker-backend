import moment from "moment";
import * as waterService from "../services/waterServices.js";

const getTotalWaterForToday = async (owner) => {
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

  const filter = { date: { $gte: today, $lt: tomorrow }, owner };
  const setting = { sort: { date: "asc" } };

  const result = await waterService.getWaterPerDay({ filter, setting });

  const totalAmount = result.reduce((acc, curr) => acc + curr.amount, 0);

  return { result, totalAmount };
};

export default getTotalWaterForToday;
