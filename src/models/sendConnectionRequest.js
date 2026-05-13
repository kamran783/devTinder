const mongoose = require("mongoose");
const {Schema} = mongoose;

const connectionRequest = new Schema({
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    receiver : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    status : {
        type : String,
        enum : ["intrested", "ignored"],
        required : true,
    }
},
{
    timestamps : true,
})

module.exports = mongoose.model("userConnection", connectionRequest);