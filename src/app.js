const express = require("express");

const app = express();



//poor way of autthorization of users
app.use("/admin/getalldata",(req,res)=>{
  let token = "xyx";
  let isAuthorized = token === "xyx";
  if(isAuthorized){
    res.send("first one")
  } else {
    res.status(401).send("not authorized")
  }
})
app.use("/admin/setalldata",(req,res)=>{
  let token = "xyx";
  let isAuthorized = token === "xyx";
  if(isAuthorized){
    res.send("second one")
  } else {
    res.status(401).send("not authorized")
  }
})




app.listen(7777, () => {
  console.log("server is listening on port 7777");
});
