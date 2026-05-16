const express = require("express");
const connectionRequest = require("../models/sendConnectionRequest");
const {userAuth} = require("../middleware/auth");
const userRouter = express.Router();

userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    let loggedInUser = req.user;
    let findConnectionds = await connectionRequest.find({
      receiver : loggedInUser._id,
      status: "intrested",
    }).populate("sender", ["firstName", "lastName", "gender"]);

    res.send(findConnectionds )

  } catch (err) {
    res.status(404).send(err.message);
  }
});

module.exports = userRouter;
