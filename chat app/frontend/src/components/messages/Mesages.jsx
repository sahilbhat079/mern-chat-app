import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/usegetmeassages'
import MessageSkeleton from '../skeltons/MessageSkeleton';
import  uselistenmessages from '../../hooks/uselistenmessages'
export default function Mesages() {
    const  {loading,messages}=useGetMessages();
    uselistenmessages();  
    const lastMessageRef = useRef(null);
    useEffect(() => {
        const timeout = setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);

        return () => clearTimeout(timeout);
    }, [messages]);

    return (
//     
<div className='px-4 flex-1 overflow-auto'>
{loading && [...Array(3)].map((_, idx) => (
    <MessageSkeleton key={idx} />
))}

{!loading && messages.length > 0 && messages.map((message) => (
    <div key={message._id} ref={lastMessageRef}>
        <Message message={message} />
    </div>
))}

{!loading && messages.length === 0 && (
    <p className='text-center'>Please Enter Message To Start Conversation...</p>
)}
</div>
    )
}
