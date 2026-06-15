const mongoose = require("mongoose");
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  await mongoose.connect(process.env.DB_CONNECTION_STRING);
};

module.exports = connectDB; 