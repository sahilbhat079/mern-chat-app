const mongoose=require('mongoose');

const connectiondb=async()=>{
    try {
        const connect =await mongoose.connect(process.env.MONGO_DB_URL)
        console.log(`connected to mongodb ${connect.connection.host} `);
        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports=connectiondb;