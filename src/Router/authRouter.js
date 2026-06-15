const express = require("express");
const { validatedata } = require("../utils/validatedata");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { userAuth } = require("../middleware/auth");

const authRouter = express.Router();

authRouter.post("/Signup", async (req, res) => {
  try {
    validatedata(req);

    const { password, firstName, lastName, age, gender, email, skills, about } =
      req.body;

    let hashPassword = await bcrypt.hash(password, 10);

    let user = new User({
      firstName,
      lastName,
      email,
      age,
      gender,
      skills,
      about,
      password: hashPassword,
    });

    const savedUser = await user.save();
    const token = await savedUser.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    res.json({ message: "User Added Sucessfully", data: savedUser });
  } catch (err) {
    res.status(400).send("Error adding a new member: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send("Invalid credentials");
    }

    const isPasswordCorrect = await user.validatePassword(password);

    if (isPasswordCorrect) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });
      res.send(user);
    } else {
      return res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .send("Logout Sucessfull!!!");
});

module.exports = authRouter;
