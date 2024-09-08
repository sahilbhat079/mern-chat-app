import React from 'react';
import useConversation from '../strore/useConversation';
import { useSocketcontect } from '../context/Socketcontext';

export default function Conversation({conversation,lastindex, emoji }) {


  const {selectedConversation,setselectedconversation} = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  // const isselected = selectedConversation?._id.toString() === conversation._id.toString();
   
 const {onlineUsers}=useSocketcontect();
 const isonline=onlineUsers.includes(conversation._id);
  
  return (
    <>
      <div 
      className={`flex gap-2 items-center hover:bg-sky-400 p-2 py-1 cursor-pointer
        ${isSelected ? "bg-sky-500":" "}`}

        onClick={() => setselectedconversation(conversation) }
        >
        <div className={`avatar ${isonline?"online":""}`}>
          <div className="w-14 rounded-full">
            <img src={conversation.profilepic} alt={`${conversation.fullname}'s profile`} />
          </div>
        </div>

        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between'>
            <p className='font-bold text-gray-200'>{conversation.fullname}</p>
            <span className='text-xl'>{emoji}</span>
          </div>
        </div>
      </div>
      {lastindex && <div className='divider my-0 h-1 py-0'></div>}
    </>
  );
}
