const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect("mongodb+srv://kamran:ahmed2345@cluster0.ws4aamz.mongodb.net/devTinder");
};

module.exports = connectDB; // ✅ must export!