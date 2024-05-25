const mongoose = require("mongoose");
require("dotenv").config();
/*
 * Connect to MongoDB using mongoose
 * @param {string} db_url - MongoDB connection URL
 */

const db_url = process.env.DB_URL;

const connectDB = async () => {
  await mongoose
    .connect(db_url)
    .then(console.log("MongoDB connected successfully"))
    .catch((err) => console.log(err));
};


module.exports = connectDB; 