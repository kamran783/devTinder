const express = require('express');

const app = express();

app.use("/",(req,res)=>{
    res.send("Hello express.js from node")
})
app.use("/login",(req,res)=>{
    res.send("hello login")
})
app.listen(7777);
