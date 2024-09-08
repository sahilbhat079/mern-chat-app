import React, { useRef, useState ,useEffect} from 'react'
import { BsSend } from "react-icons/bs";
import useSendMessage from '../../hooks/usesendmessage';
import toast from 'react-hot-toast';



export default function Messageinput() {
  const inputRef = useRef(null);
const [message,setmessage]=useState("");
const {loading,sendMessage}=useSendMessage();

useEffect(() => {
  // Auto-focus the input field when the component mounts
  inputRef.current.focus();
 
}, []);

const handlesubmit=async(e)=>{
e.preventDefault();
if(!message.trim())return;
try {
  await sendMessage({ text: message });
  // toast.success("Message sent successfully!");  // Show success message
} catch (error) {
  toast.error("Failed to send message.");  // Show error message if sending fails
} finally {
  setmessage("");  // Clear the input after sending
}
// setmessage("");
}


  return (
    <form className='px-4 my-3' onSubmit={handlesubmit}>
      <div className='w-full relative '>
      <input ref={inputRef} type="text" placeholder="Send message" className="rounded-lg border block border-gray-600 w-full p-2.5 text-white bg-gray-500 text-sm" 
       value={message} onChange={(e)=>{setmessage(e.target.value)}}/>
      <button type='submit'
                    className='absolute inset-y-0 right-1 flex items-center px-3 hover:bg-sky-400'  // Fixed hover class
         >
        {!loading? <BsSend/>:<span className="loading loading-spinner loading-md"></span>}
      </button>
      </div>
    </form>
  )
}
