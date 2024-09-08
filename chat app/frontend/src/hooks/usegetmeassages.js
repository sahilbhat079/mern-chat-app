import { useEffect,useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../strore/useConversation";




const useGetMessages=()=>{
    const [loading ,setloading]=useState(false);
    const { messages,setmessages,selectedConversation}=useConversation();

useEffect(() => {  
const getMessage=async()=>{
    setloading(true);
    try {
const res = await fetch(`/api/messages/${selectedConversation?._id}`);
const data = await res.json();
  if(data.error)throw new Error(data.error);

  setmessages(data);


    } catch (error) {
        toast.error(error.message);  
        setmessages([])
      }
    finally{
        setloading(false);
       
    }
} 

if (selectedConversation?._id ) getMessage();

}, [selectedConversation?._id,setmessages]);


return {loading,messages};
};



export default useGetMessages;