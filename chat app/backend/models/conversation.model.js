const mongoose=require('mongoose');
const coversationSchema=new mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
    ],
    message:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Message',
        default:[],
    }]
},{timestamps:true});

module.exports=mongoose.model('Conversation',coversationSchema);

