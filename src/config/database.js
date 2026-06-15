const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  await mongoose.connect(process.env.DB_CONNECTION_STRING);
};

module.exports = connectDB;