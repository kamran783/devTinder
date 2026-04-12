const express = require("express");

const app = express();

// Use regex --we can as many as bbbbbbbbbb 
app.get(/\/ab+c/, (req, res) => {
  res.send("matched!");
});

app.listen(7777);
