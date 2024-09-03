import React from 'react';
import Conversation from './Conversation';
import useGetConversation from '../hooks/usegetconversation';
import getRandomEmoji from '../utility/getemojis';

export default function Conversations() {
  const {loading,conversation}  = useGetConversation();    
  const allUsers = conversation?.allUsers || []; 
  // console.log("user:",conversation);
  // console.log();

  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {
        allUsers.map((user, idx) => (
          <Conversation
            key={user._id}  // Ensure the key is unique and stable
            conversation={user}  // Pass the current message to the Conversation component
            emoji={getRandomEmoji()}  // Generate a random emoji
            lastindex={idx === allUsers.length - 1}  // Check if it's the last message
          />
        ))
      }
      {loading?<span className="loading loading-spinner loading-md"></span> : null}
    </div>
  );
}
