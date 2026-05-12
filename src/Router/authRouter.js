const express = require("express");
const { validatedata } = require("../utils/validatedata");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const authRouter = express.Router();

authRouter.post("/Signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      res.status(400).send("Invalid credentials");
    }

    const isPasswordCorrect = await user.validatePassword(password);

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

module.exports = authRouter;