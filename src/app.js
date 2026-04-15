const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
require("dns").setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

app.use(express.json());

app.post("/Signup", async (req, res) => {

  const user = new User(req.body)
  try {
    //let users = await User.find({age : req.body.age})
    //let users = await User.findOne({age : req.body.age})
    let users = await User.exists({age : req.body.age})
    if(users.length === 0){
      res.status(400).send("No users present")
    }
    res.send(users);
  } catch (err) {
    res.status(404).send("Error saving the user data" + err.message);
  }
});

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
