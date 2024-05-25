const csv = require("csv-parser");
const TradeSchema = require("./schema");

//*task 1:- Function to add data from a CSV file
const addData = async (req, res) => {
  const CSV_file = req.file;

  //* Read the CSV file and process each row
  require("stream")
    .Readable.from(CSV_file.buffer)
    .pipe(csv())
    .on("data", async (row) => {
      await TradeSchema.create({
        User_ID: row.User_ID,
        UTC_Time: row.UTC_Time,
        Operation: row.Operation,
        Market: row.Market,
        Buy_Sell_Amount: row["Buy/Sell Amount"],
        Price: row.Price,
      });
    })
    .on("end", () => {
      res.status(200).send("Data added successfully");
    });
};

//* Task 2:- Function to get asset balance data
const getBalance = async (req, res) => {
  const { timestamp } = req.body;
  let assetBalance = {};

  const transaction_data = await TradeSchema.find({
    UTC_Time: { $lt: timestamp },
  });

  //* Calculate the balance for each asset
  transaction_data.forEach((data) => {
    let { Operation, Buy_Sell_Amount, Market } = data;
    Market = Market.split("/")[0];

    if (Operation === "Buy") {
      assetBalance[Market] = (assetBalance[Market] || 0) + Buy_Sell_Amount;
    } else if (Operation === "Sell") {
      assetBalance[Market] = (assetBalance[Market] || 0) - Buy_Sell_Amount;
    }
  });

  //* Send the balance data as a response
  res.status(200).send(assetBalance);
};

//* exports the function
module.exports = {
  addData,
  getBalance,
};
