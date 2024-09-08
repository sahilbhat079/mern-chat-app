const {Server}=require('socket.io');
const http=require('http');
const express = require('express');


const app = express();
const server = http.createServer(app);
const io = new Server(server,
    {
        cors: {
            origin: ['https://chat-appg-sg.onrender.com'], // Corrected the URL
            methods: ['GET', 'POST'],
        }
});

const usersocketmap={};

const getReceiverSockectid=(Receiverid)=> {
    if (!Receiverid || !usersocketmap[Receiverid]) {
        console.log(`Receiver ID not found: ${Receiverid}`);
        return null;
    }
    console.log("The receiver's socket ID is", usersocketmap[Receiverid]);
    return usersocketmap[Receiverid];// Return the socket ID of the receiver
}






// Socket.IO Setup
io.on('connection', (socket) => {
    console.log('A user connected',socket.id);
    const userid=socket.handshake.query.userid;
  
    if (userid && userid !== "undefined") {
        usersocketmap[userid] = socket.id;
        console.log(`User ${userid} connected with socket ID ${socket.id}`);
    }



io.emit('Allonlineusers',Object.keys(usersocketmap)); // Broadcast message to all clients


socket.on('disconnect', () => {
    console.log('User disconnected',socket.id);
    delete usersocketmap[userid];
    io.emit('Allonlineusers',Object.keys(usersocketmap)); // Broadcast message to all clients
});
});







module.exports = { app,io, server,getReceiverSockectid}