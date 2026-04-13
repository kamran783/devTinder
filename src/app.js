const express = require("express");
const { adminAuth } = require("./middleware/auth.js");

const app = express();

app.use("/admin", adminAuth);

app.get("/admin/getalldata", (req, res) => {
  res.send("get user data verified");
});

app.get("/admin/setalldata", (req, res) => {
  res.send("set user data has successfully done!!!");
});

app.get("/allauths",adminAuth, (req,res)=>{
  res.send("works perfectly fine!!")
})

app.listen(7777, () => {
  console.log("server is listening on port 7777");
});