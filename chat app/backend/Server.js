const express =require('express')
require('dotenv').config();
// const helmet = require('helmet');
const cookieParser= require('cookie-parser');


const errorhandler = require('./middleware/Errorhandler');


const messageRoutes=require('./routes/messages.routes');
const authRoutes=require('./routes/auth.routes');
const Usersroute=require('./routes/Users.route');


const connectiondb=require('./db/connection');


const port = process.env.PORT || 3000
const app = express()

// app.use(helmet());
// app.disable('x-powered-by');

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",Usersroute);



app.use(errorhandler);



app.listen(port,()=>{
    connectiondb();
    console.log(`server is runining on port ${port}`)
})