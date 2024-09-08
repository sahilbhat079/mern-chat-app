import React from 'react'
import { useAuthHook } from '../../context/Authcontext'
import useConversation from '../../strore/useConversation';
export default function Message({message}) {
  
  const {Authuser}=useAuthHook();
  const {selectedConversation}=useConversation();
  

  
   if (!message|| !Authuser) return null;
   const froMe = message.SenderID=== Authuser._id ;
   const chatClassName = froMe ? 'chat-end' : 'chat-start';
   const profilepic = froMe ? Authuser.profilepic : selectedConversation?.profilepic;
   const bubblecolor = froMe ? "bg-blue-500" : "bg-gray-700";

   function formatTime(isoString) {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      console.error("Error formatting time:", error);
      return "";
    }
  }

  
  
  return (
    <div className={`chat ${chatClassName}`}>
    <div className="chat-image avatar">
      <div className="w-10 rounded-full">
        <img
          alt="Tailwind CSS chat bubble component"
          src={profilepic}/>
      </div>
    </div>
    <div className="chat-header">

      <time className="text-xs  opacity-100">{ formatTime(message.createdAt)}</time>
    </div>
    <div className={`chat-bubble text-white bg-blue-500 ${bubblecolor} pb-3 `}>{message.message}</div>
    <div className="chat-footer opacity-80 text-xs flex gap-1 items-center">Delivered  </div>
  </div>
  )
}
