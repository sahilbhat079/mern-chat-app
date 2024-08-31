const expressAsyncHandler = require("express-async-handler")
const User=require('../models/user.model');

const getuser=expressAsyncHandler(async(req,res)=>{
try {
   const loggeduserid=req.user._id;
   const allUsers=await User.find({_id:{$ne:loggeduserid}});


   res.status(200).json({allUsers})


   const user=await User.find()
} catch (error) {
    console.log("error in get user controler",error.message );
    res.status(500);
   throw new Error(error);
}
});


module.exports=getuser