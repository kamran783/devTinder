const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
require("dns").setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

app.use(express.json());

// connect DB FIRST
connectDB().then(() => {
  console.log("DB connected");

  app.listen(1234, () => {
    console.log("Server running on 1234");
  });
});

//POST creates the new data
app.post("/Signup", async (req, res) => {
  let user = new User(req.body);
  try {
    await user.save();
    console.log(user)
    res.send("Added to database");
  } catch (err) {
    res.status(400).send("Error addind a new member" + err.message);
  }
});

//GET retrive the data from database
app.get("/users", async (req, res) => {
  //let userId = req.body._id;
  try {
    let users = await User.find({});
    console.log("found user " + users);
    res.send(users);
  } catch (err) {
    res.status(500).send("User not found");
  }
});

//PATCH partially updates the database
app.patch("/update", async (req, res) => {
  let userId = req.body.userId;
  const data = req.body;
  try {
    let update = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument : "after",
      runValidators: true,
    });
    console.log(update)
    res.send(update);
  } catch (err) {
    res.status(400).send("user not found");
  }
});
