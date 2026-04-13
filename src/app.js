const express = require("express");

const app = express();

//handling multiple routes

//Always send a response in every route — otherwise browser will wait forever and eventually timeout! ⏳

app.use(
  "/app",
  [(req, res, next) => {
    //res.send("listening server on port777");
    next()
  },
  (req, res, next) => {
    console.log("2nd route handler");
    //res.send("2nd route")
    next()
  }],[
  (req,res)=>{
    res.send("3rd rote")
  }]
);

app.listen(7777, () => {
  console.log("server is listening on port 7777");
});
