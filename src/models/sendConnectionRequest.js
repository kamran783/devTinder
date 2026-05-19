const mongoose = require("mongoose");
const {Schema} = mongoose;

const connectionRequest = new Schema({
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    receiver : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    status : {
        type : String,
        enum : ["intrested", "ignore", "accepted", "rejected"],
        required : true,
    }
},
{
    timestamps : true,
})

connectionRequest.pre("save", function(){
    let currentuser = this;
    if(currentuser.sender.equals(currentuser.receiver)){
         throw new Error("You cant request to yourself")
    }

})



module.exports = mongoose.model("userConnection", connectionRequest);