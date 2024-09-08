import  { useEffect } from 'react'
import { useSocketcontect } from '../context/Socketcontext'
import useConversation from '../strore/useConversation';
import notificationSound from '../assets/sounds/notification.mp3'

const uselistenmessages = () => {
 const {socket}=useSocketcontect();
 const {messages,setmessages}=useConversation();

useEffect(() => {
  socket?.on("newmesage", (newmesage) => {
    // newMessage.shouldShake = true;
    const sound = new Audio(notificationSound);
    sound.play();
    setmessages([...messages,newmesage]);
  });

  return () => socket?.off("newmesage");
}, [socket, setmessages, messages]);

}

export default uselistenmessages




