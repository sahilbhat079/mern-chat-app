const expressAsyncHandler = require("express-async-handler");
const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");

const sendmessage = expressAsyncHandler(async (req, res) => {
    try {
        console.log("working");
        const { message } = req.body;
        const { id:ReceiverID } = req.params;
        const SenderID = req.user._id;
        // console.log(SenderId);
        // console.log(ReceiverId);

        let convo = await Conversation.findOne({
            participants: { $all: [SenderID,ReceiverID] },
        });
        
        if (!convo) {
            convo = await Conversation.create({
                participants: [SenderID, ReceiverID]},
            );
        }
        const newmesage = new Message({
            SenderID,
            ReceiverID,
            message,
        });
        
        console.log("working meassga");

        if (newmesage) {
            convo.message.push(newmesage._id)
        }
        // await newmesage.save();
        // await convo.save();
        await Promise.all([newmesage.save(),convo.save()])
        res.status(200).json({ newmesage });

    } catch (error) {
        res.status(500);
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
