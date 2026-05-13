const express = require("express");
const { userAuth } = require("../middleware/auth");
const connectionRequest = require("../models/sendConnectionRequest");

const RequestRouter = express.Router();

RequestRouter.post(
  "/request/send/:intrested/:receiver",
  userAuth,
  async (req, res) => {
    try {
      let sender = req.user._id;
      let receiver = req.params.receiver;
      let status = req.params.intrested;

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

module.exports = RequestRouter;
