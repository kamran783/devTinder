const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
require("dns").setServers(["8.8.8.8", "1.1.1.1"]);
const {validatedata} = require("./utils/validatedata")
const bcrypt = require("bcrypt");

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
  //validate signUp Api

  validatedata(req);

  const{password, firstName, lastName, age, gender,email, skills} = req.body

  //bcrypt user data
  let hashPassword = await bcrypt.hash(password, 10)
  
  let user = new User({
    firstName, 
    lastName,
    email,
    age,
    gender,
    skills,
    password : hashPassword
  });
  try {
    await user.save();
    console.log(user);
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
app.patch("/update/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["age", "skills", "gender"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills?.length > 10) {
      throw new error("skills cannot be more than 10");
    }

    const user = await User.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    });

    if (!user) return res.status(404).send("User not found");

    console.log(user);
    res.send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
