const express = require('express');

const app = express();

app.use("/login",(req,res)=>{
    res.send("/login/2")
})
app.post("/user",(req, res)=>{
    res.send({firstname:"kamran", lastname : "ahmed"})
})

app.listen(7777);
