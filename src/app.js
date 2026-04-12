const express = require("express");

const app = express();

app.get("/user/:userId/:name/:age", (req, res) => {
  console.log(req.params);
  res.send("matched!");
});

app.listen(7777, ()=>{
    console.log("server is listening on port 7777")
});
