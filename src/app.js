const express = require("express");

const app = express();

// Use Use .*a.* — which means anything, then a, then anything:

app.get(/\/.*a.*/, (req, res) => {
  res.send("matched!");
});

app.listen(7777);
