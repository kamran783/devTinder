const express = require("express");

const app = express();

// Use .* instead — . means any character, * means zero or more:

app.get(/\/ab.*c/, (req, res) => {
  res.send("matched!");
});

app.listen(7777);
