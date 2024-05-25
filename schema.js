const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TradeSchema = new Schema({
  User_ID: { type: String, required: true },
  UTC_Time: { type: Date, required: true },
  Operation: { type: String, required: true },
  Market: { type: String, required: true },
  Buy_Sell_Amount: { type: Number, required: true },
  Price: { type: Number, required: true },
});

module.exports = mongoose.model("Trade", TradeSchema);
