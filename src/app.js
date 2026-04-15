const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user")
require("dns").setServers(["8.8.8.8", "1.1.1.1"]); 

const app = express();
app.post("/Signup",async (req,res)=>{
  //creating instance of user class
  const user = new User({
    firstName : "John",
    lastName : "Doe",
    email : "John@gmail.com",
    age : 21,
    password : "jonny"

  });
  try {

    await user.save()
    res.send("user data Added Sucessfully")
  }catch(err){
    res.status(400).send("Error saving the user data"+ err.message)
  }
})
connectDB()
  .then(() => {
    console.log("Successfully connected to database ✅");
    app.listen(7777, () => {
      console.log("Server is listening on port 7777");
    });
  })
  .catch((err) => {
    console.log(err);
  });