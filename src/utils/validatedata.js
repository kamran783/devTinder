const validator = require("validator");
const validatedata = (req) => {
  const { email, password, firstName, lastName } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Enter valid Name");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a Strong password");
  } else if (!validator.isEmail(email)) {
    throw new Error("Enter a valid Email Id");
  }
};

const validateEditdata = (req) => {
  const isAllowedUpdates = ["firstName", "lastName", "skills", "email", "age"];

  let isAllowed = Object.keys(req.body).every((key) => isAllowedUpdates.includes(key));

  return isAllowed;
};

module.exports = {
  validatedata,
  validateEditdata,
};
