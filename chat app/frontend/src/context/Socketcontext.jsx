import { createContext, useContext, useEffect, useState } from "react";
import { useAuthHook } from './Authcontext';
import io from 'socket.io-client';

export const Socketcontext = createContext();

export const useSocketcontect = () => {
    return useContext(Socketcontext);
}




export const SocketcontextProvider = ({ children }) => {
   const [socket, setsocket] = useState(null);
   const [onlineUsers, setonlineUsers] = useState([]);
   const { Authuser } = useAuthHook();

   useEffect(() => {
      if (Authuser) {
         const socket = io("https://chat-appg-sg.onrender.com",{
            query: {
              userid:Authuser._id
            }
         });
         setsocket(socket);
         socket.on('Allonlineusers',(users)=>{
            setonlineUsers(users)
         })
         
         return () => {
            socket.close();
         };
      } else {
         if (socket) {
            socket.close();
         }
         setsocket(null);
      }
   }, [Authuser]);

   return (
      <Socketcontext.Provider value={{ socket, onlineUsers }}>
         {children}
      </Socketcontext.Provider>
   );
};
