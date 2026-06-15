const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter Strong password");
        }
      },
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value.toLowerCase())) {
          throw new Error("Gender not valid");
        }
      },
    },
    skills: {
      type: [String],
      validator: function (arr) {
        return arr.length <= 5; // ✅ max 5 skills allowed
      },
      message: "Skills cannot be more than 5",
      default: ["studying", "playing"],
    },
    Image: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNI-hhvFAbUrXvuW6-XpbU_cJHojzpdMZwbg&s",
    },
    about: {
      type: String,
      default: "This is the default bio",
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.getJWT = async function () {
  let user = this;
  const token = await jwt.sign({ _id: user._id }, "hawlahaikyarey", {
    expiresIn: "1d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  let user = this;
  const passwordHash = this.password;
  let isPasswordCorrect = await bcrypt.compare(
    passwordInputByUser,
    passwordHash,
  );
  return isPasswordCorrect;
};
module.exports = mongoose.model("User", userSchema);
