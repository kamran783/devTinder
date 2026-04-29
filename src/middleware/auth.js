const jwt = require("jsonwebtoken")
const User = require("../models/user")
let userAuth = async(req, res, next) => {
  try{
    
  const {token} = req.cookies; 
  if (!token) {
    throw new Error("please Login");
  } 
  let decodedMsg = jwt.verify(token,"hawlahaikyarey")
  console.log(decodedMsg)
  const {_id} = decodedMsg;
  let user = await User.findById(_id);
  if(!user){
    throw new Error("user not found")
  }
  req.user = user;
  next();

} catch(err){
    res.status(400).send("user not found : "+ err.message)
  }
};
module.exports = {
    userAuth,
}