const express = require("express");
const connectionRequest = require("../models/sendConnectionRequest");
const { userAuth } = require("../middleware/auth");
const userRouter = express.Router();

userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    let loggedInUser = req.user;
    let findConnectionds = await connectionRequest
      .find({
        receiver: loggedInUser._id,
        status: "intrested",
      })
      .populate("sender", "firstName lastName gender");
    // }).populate("sender", ["firstName", "lastName", "gender"]);

    res.json({ message: "Your follow requests", data: findConnectionds });
  } catch (err) {
    res.status(404).send(err.message);
  }
});

userRouter.get("/users/connections", userAuth, async (req, res) => {
  try {
    let loggedInUser = req.user;
    let connections = await connectionRequest
      .find({
        $or: [
          { sender: loggedInUser, status: "accepted" },
          { receiver: loggedInUser, status: "accepted" },
        ],
      })
      .populate("sender", "firstName lastName")
      .populate("receiver", "firstName lastName");

    let data = connections.map((row) => {
      if (row.sender._id.toString() === loggedInUser._id.toString()) {
        return row.receiver;
      }
      return row.sender;
    });

    if (!connections) {
      return res.status(400).json({ message: "no connections found" });
    }
    res.json({ data });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
module.exports = userRouter;
