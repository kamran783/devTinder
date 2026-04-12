const express = require('express');

const app = express();

    app.get("/user",(req, res)=>{
        res.send({firstname : "kamran", lastname : "Ahmed"});
    })
    app.post("/user",(req, res)=>{
        res.send("Saved data to database");
    })
    app.delete("/user",(req, res)=>{
        res.send("Deleted data sucessfully");
    })

app.listen(7777);
