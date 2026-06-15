const express = require("express");
const { userAuth } = require("../middleware/auth");
const User = require("../models/user");
const { validateEditdata } = require("../utils/validatedata");
const bcrypt = require("bcrypt");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditdata(req)) {
      throw new Error("Invalid Edit request");
    }
    let loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.send(loggedInUser);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.get("/profile/password", userAuth, async (req, res) => {
  let { _id } = req.user;
  let newPassword = req.body.password;
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  let resetPassword = await User.findByIdAndUpdate(_id, {password : hashedPassword});
  console.log(resetPassword)
  res.send(resetPassword);
});
module.exports = profileRouter;
