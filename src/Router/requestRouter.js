const express = require("express");
const { userAuth } = require("../middleware/auth");
const connectionRequest = require("../models/sendConnectionRequest");
const User = require("../models/user");

const RequestRouter = express.Router();

RequestRouter.post(
  "/request/send/:status/:receiver",
  userAuth,
  async (req, res) => {
    try {
      let sender = req.user._id;
      let receiver = req.params.receiver;
      let status = req.params.status;

      let allowedStatus = ["ignore", "intrested"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).send("Invalid user request!!");
      }

      let checkExistingRequest = await connectionRequest.findOne({
        $or: [
          { sender, receiver },
          { sender: receiver, receiver: sender },
        ],
      });
      if (checkExistingRequest) {
        return res.status(404).json({
          message: "Connection request already sent",
        });
      }

      let toReceiver = await User.findById(receiver);
      if (!toReceiver) {
        return res.status(400).json({ message: "User not found" });
      }

      let requestScheme = new connectionRequest({
        sender,
        receiver,
        status,
      });
      await requestScheme.save();
      res.json({
        message: "Request has been sent successfully",
        data: requestScheme,
      });
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  },
);

RequestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      let loggedInUser = req.user;
      let { requestId, status } = req.params;
      let allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "status not valid" });
      }
      // Add temporarily before findOne()
      const debugDoc = await connectionRequest.findById(requestId);
      console.log("Found doc:", debugDoc);
      let requestUser = await connectionRequest.findOne({
        _id: requestId,
        receiver: loggedInUser._id,
        status: "intrested",
      });
      if (!requestUser) {
        return res
          .status(400)
          .json({ message: "Connection Request not found!!!" });
      }
      requestUser.status = status;
      await requestUser.save();
      res.send(requestUser);
    } catch (err) {
      res.status(400).json({ message: "ERROR : " + err.message });
    }
  },
);

module.exports = RequestRouter;
