const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
require("dns").setServers(["8.8.8.8", "1.1.1.1"]);
const { validatedata } = require("./utils/validatedata");
const bcrypt = require("bcrypt");
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/auth");

const app = express();
app.use(express.json());
app.use(cookieparser());

connectDB().then(() => {
  console.log("DB connected");
  app.listen(1234, () => {
    console.log("Server running on 1234");
  });
});

app.post("/Signup", async (req, res) => {
  try {
    validatedata(req);

    const { password, firstName, lastName, age, gender, email, skills } =
      req.body;

    let hashPassword = await bcrypt.hash(password, 10);

    let user = new User({
      firstName,
      lastName,
      email,
      age,
      gender,
      skills,
      password: hashPassword,
    });

    await user.save();
    res.send("Added to database");
  } catch (err) {
    res.status(400).send("Error adding a new member: " + err.message);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      res.status(400).send("Invalid credentials");
    }

    const isPasswordCorrect = await validatePassword(password);

    if (isPasswordCorrect) {
      const token = await user.getJWT();

      res.cookie("token", token, { expires: new Date(Date.now() + 900000) });
      res.send("Login Successful");
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.post("/sendConnectionRequest", userAuth, (req, res) => {
  let user = req.user;
  res.send(user.firstName + "!! has a send a connection request");
});

app.get("/users", async (req, res) => {
  try {
    let users = await User.find({});
    console.log("found users: " + users);
    res.send(users);
  } catch (err) {
    res.status(500).send("User not found");
  }
});

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
      throw new Error("Skills cannot be more than 10"); // 👈 fixed: "error" → "Error"
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
