const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
require("dns").setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

app.use(express.json());

app.post("/Signup", async (req, res) => {
  let newUser = req.body;
  const user = new User(newUser);
  try {
    await user.save();
    res.status(201).send("User Logged In Sucessfully");
  } catch (err) {
    res.status(400).send("Something went wrong!!");
  }
});

app.post("/delete", async (req, res) => {
  const userId = req.body.userId;
  try {
    const deletedUser = await User.findByIdAndDelete({ _id: req.body._id });

    res.send("User deleted Sucessfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.post("/update", async (req, res) => {
  let userId = req.body.userId;
  const data = req.body;
  try {
    let update = await User.findByIdAndUpdate({ _id: userId }, data);
    res.send("user updated Sucessfully");
  } catch (err) {
    res.status(400).send("user not found to update");
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
