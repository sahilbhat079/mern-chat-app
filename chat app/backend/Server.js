const express =require('express')
const path =require('path');

require('dotenv').config();
// const helmet = require('helmet');
const cookieParser= require('cookie-parser');


const errorhandler = require('./middleware/Errorhandler');


const messageRoutes=require('./routes/messages.routes');
const authRoutes=require('./routes/auth.routes');
const Usersroute=require('./routes/Users.route');


const connectiondb=require('./db/connection');
const { app, server } = require('./socket/socket');


const port = process.env.PORT || 3000
// const app = express()

// const __dirname = path.resolve();
// app.use(helmet());
// app.disable('x-powered-by');

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",Usersroute);

app.use(errorhandler);
app.use(express.static(path.join(__dirname, "..", "frontend", "dist")))

app.get("*",(req,res)=>{
    console.log(path.join(__dirname, "..", "frontend", "dist", "index.html"));
    res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html") );
})



server.listen(port,()=>{
    connectiondb();
    console.log(`server is runining on port ${port}`)
})