import mongoose from "mongoose"
const { Schema } = mongoose;

//Schema is a blueprint of how your data will look in the database!
//without {Schema} you can use (mongoose.Schema({}))
const userSchema = new Schema({
    firstName : {
        type : String,
    },
    lastName : {
        type : String,
    },
    Email : {
        type : String,
    },
    age: {
        type : Number,
    },
    password : {
        type : String,
    }

})

// Model = actual class to interact with DB 🏗️
module.exports = mongoose.model("User", userSchema)