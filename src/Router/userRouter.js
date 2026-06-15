const express = require("express");
const connectionRequest = require("../models/sendConnectionRequest");
const { userAuth } = require("../middleware/auth");
const User = require("../models/user");
const userRouter = express.Router();

userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    let loggedInUser = req.user;
    let findConnectionds = await connectionRequest
      .find({
        receiver: loggedInUser._id,
        status: "intrested",
      })
      .populate("sender", "firstName lastName gender Image gender about");
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
      .populate("sender", "firstName lastName Image age gender about")
      .populate("receiver", "firstName lastName Image age gender about");

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

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    let loggedInUser = req.user;

    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    let myConnections = await connectionRequest
      .find({
        $or: [{ sender: loggedInUser._id }, { receiver: loggedInUser._id }],
      })
      .populate("sender", "firstName lastName")
      .populate("receiver", "firstName lastName");

    let hideUsersFromFeed = new Set();
    myConnections.forEach((conn) => {
      hideUsersFromFeed.add(conn.sender._id.toString());
      hideUsersFromFeed.add(conn.receiver._id.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select("firstName lastName skills Image age about gender")
      .skip(skip)
      .limit(limit);
    res.send(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = userRouter;
