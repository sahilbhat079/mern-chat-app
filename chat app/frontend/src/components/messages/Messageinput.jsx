import React from 'react'
import { BsSend } from "react-icons/bs";
export default function Messageinput() {
  return (
    <form className='px-4 my-3'>
      <div className='w-full relative '>
      <input type="text" placeholder="Send message" className="input rounded-lg border block border-gray-600  w-full p-2.5 text-white bg-gray-700 text-sm" />
      <button type='submit' className=' absolute  inset-y-0 end-0 flex items-center pe-3'><BsSend/> 
      </button>
      </div>
    </form>
  )
}
