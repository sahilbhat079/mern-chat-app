const expressAsyncHandler = require("express-async-handler");
const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");
const {getReceiverSockectid,io}=require('../socket/socket.js');

const sendmessage = expressAsyncHandler(async (req, res) => {
    try {
      // console.log("working");
      let { message } = req.body;
      if (typeof message === "object" && message.text) {
        message = message.text;
      }
      const { id: ReceiverID } = req.params;
      const SenderID = req.user._id;
      // console.log(SenderId);
      // console.log(ReceiverId);
      // console.log(typeof(message));
      // console.log(message);
      //  message=message.text;

      let convo = await Conversation.findOne({
        participants: { $all: [SenderID, ReceiverID] },
      });

      if (!convo) {
        convo = await Conversation.create({
          participants: [SenderID, ReceiverID],
        });
      }
      const newmesage = new Message({
        SenderID,
        ReceiverID,
        message,
      });

      // console.log("working meassga");

      if (newmesage) {
        convo.message.push(newmesage._id);
      }
      // await newmesage.save();
      // await convo.save();
      await Promise.all([convo.save(),newmesage.save()]);

    // Socket io function;
   const socketReceiverID=await getReceiverSockectid(ReceiverID);
  //  console.log("the reseceiver id is ",ReceiverID,socketReceiverID);
    
    if(socketReceiverID){
      io.to(socketReceiverID).emit('newmesage',newmesage);  
    }
    // console.log(newmesage); 

     

      res.status(200).json({ newmesage });
    } catch (error) {
        res.status(500);ru
        console.log(error);
        throw new Error(error);

    }
});



const getMessage=expressAsyncHandler (async (req,res) =>{
    try {
    const {id:UserChatId}=req.params;
    const senderid=req.user._id;
//   console.log(1);
  const converssation=await Conversation.findOne({participants:{$all:[senderid,UserChatId]}}).populate("message");
//   console.log(2);
  
  res.status(200).json(converssation.message);
//   console.log(3);


if(!converssation){
    return res.status(200).json([]);
}


        
    } catch (error) {
        console.log("error in get message controller" ,error.message);
        res.status(500);
        throw new Error(error);
    }
    
});


module.exports = {sendmessage,getMessage};
