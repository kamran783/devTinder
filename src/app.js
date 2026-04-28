const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
require("dns").setServers(["8.8.8.8", "1.1.1.1"]);
const { validatedata } = require("./utils/validatedata");
const bcrypt = require("bcrypt");
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cookieparser())

connectDB().then(() => {
  console.log("DB connected");
  app.listen(1234, () => {
    console.log("Server running on 1234");
  });
});


app.post("/Signup", async (req, res) => {
  try {
    validatedata(req);

    const { password, firstName, lastName, age, gender, email, skills } = req.body;

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
    console.log(user);
    res.send("Added to database");

  } catch (err) {
    res.status(400).send("Error adding a new member: " + err.message);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body; 

  try {
    let user = await User.findOne({ email }); 
    
    if (!user) {
      return res.status(400).send("Invalid credentials");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {

      let token = jwt.sign({_id : user._id}, "hawlahaikyarey" )
      
      res.cookie("token", token);
      return res.send("Login Successful");
    } else {
      return res.status(400).send("Invalid Credentials");
    }

  } catch (err) {
    return res.status(400).send("Error: " + err.message);
  }
});

app.get("/profile", async(req,res)=>{
  let cookies = req.cookies;

  const {token} = cookies;

  if (!token) {
    return res.status(401).json({ message: "No token found in cookies" });
  }
  //validatiny my token
  let decodedMsg = jwt.verify(token, "hawlahaikyarey")
  let user = await  User.findById(decodedMsg._id)
  console.log(user)
  res.send(user)
})

app.get("/users", async (req, res) => {
  try {
    let users = await User.find({});
    console.log("found users: " + users);
    res.send(users);
  } catch (err) {
    res.status(500).send("User not found");
  }
});


app.patch("/update/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["age", "skills", "gender"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }

    if (data?.skills?.length > 10) {
      throw new Error("Skills cannot be more than 10"); // 👈 fixed: "error" → "Error"
    }

    const user = await User.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    });

    if (!user) return res.status(404).send("User not found");

    console.log(user);
    res.send(user);

  } catch (err) {
    res.status(400).send(err.message);
  }
});