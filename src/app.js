const express = require("express");
const connectDB = require("./config/database");
require("dns").setServers(["8.8.8.8", "1.1.1.1"]); 

const app = express();

connectDB()
  .then(() => {
    console.log("Successfully connected to database ✅");
    app.listen(7777, () => {
      console.log("Server is listening on port 7777");
    });
  })
  .catch((err) => {
    console.log(err);
  });