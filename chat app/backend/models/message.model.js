const mongoose =require('mongoose');

const messageSchema=new mongoose.Schema({
    SenderID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    ReceiverID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    message:{
        type:String,
        required:true,
    }

    //creadtedat //updatedat 
},{timestamps:true})

const Message=mongoose.model('Message',messageSchema);
module.exports=Message;


