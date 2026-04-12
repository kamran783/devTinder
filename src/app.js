const express = require("express");

const app = express();

// Use Use .*a.* — which means anything, then a, then anything:


//------------------------------------------------------------------------------------------------------
//when to use which regex in path 

// Is your URL fixed or simple?
//         |
//        YES → use " " string
//         |
//         NO → Does it need flexible/complex matching?
//                     |
//                    YES → use / / regex


//-------------------------------------------------------------------------------------------------------


app.get(/\/.*a.*/, (req, res) => {
  res.send("matched!");
});

app.listen(7777);
