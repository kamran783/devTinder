const express = require("express");
const { userAuth } = require("../middleware/auth");

const requestRouter = express.Router();

requestRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

requestRouter.post("/sendConnectionRequest", userAuth, (req, res) => {
  let user = req.user;
  res.send(user.firstName + "!! has a send a connection request");
});


module.exports = requestRouter;