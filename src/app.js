const express = require("express");

const app = express();

//Route Path Pattern Matching {}-optional,
app.get("/ab{c}d", (req, res) => {
  res.send({ firstname: "kamran", lastname: "Ahmed" });
});

app.listen(7777);
