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

app.get("/users", async(req,res)=>{
  let users = await User.find({});
  res.send(users)
})


const authRouter = require("./Router/authRouter");
const requestRouter = require("./Router/requestRouter");
const profileRouter = require("./Router/profileRouter");
const userRouter = require("./Router/userRouter");


app.use("/", authRouter);
app.use("/", requestRouter);
app.use("/", profileRouter)
app.use("/", userRouter)
