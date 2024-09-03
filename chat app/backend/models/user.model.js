const mongoose = require('mongoose');
const userSchema = mongoose.Schema({

    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true
    },
    profilepic: {
        type: String,
        default: ""
    }
},{timestamps:true})
module.exports=mongoose.model("User",userSchema);
