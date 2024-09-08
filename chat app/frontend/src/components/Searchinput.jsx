import React, { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import useConversation from '../strore/useConversation';
import useGetConversation from '../hooks/usegetconversation';
import toast from 'react-hot-toast';

export default function Searchinput() {
const [searchInput,setSearchinput]=useState("");
const {setselectedconversation}=useConversation();
const {conversation }=useGetConversation();


const handlesubmit=(e)=>{
e.preventDefault();
if(!searchInput)return;
if(searchInput.length<3){
  return toast.error("Enter  at least 3 characters");
}

// console.log(conversation)
if (!Array.isArray(conversation.allUsers
  )) {
  // console.error("Expected conversation to be an array but got:", conversation);
  return toast.error("Error retrieving conversations");
}

const convo = conversation.allUsers.find((c) =>
  c.fullname.toLowerCase().includes(searchInput.toLowerCase())
);


if(convo){
  console.log(convo)
  setselectedconversation(convo);
  setSearchinput("");
}
else{
  toast.error("No conversation found"); 
}

}



  return (
    <form className='flex items-center gap-2' onSubmit={handlesubmit}>
      <input type="text"  placeholder="Search..." className='input input-bordered rounded-full'  value={searchInput} onChange={(e)=>{setSearchinput(e.target.value)}} />
      <button type="submit" className='btn btn-circle text-white bg-sky-400'>
      <IoSearchSharp className='w-6 h-6 outline-none'></IoSearchSharp>      </button>
    </form>
  )
}
