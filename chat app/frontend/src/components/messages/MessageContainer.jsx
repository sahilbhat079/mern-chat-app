import React, { useEffect } from 'react'
import Mesages from './Mesages'
import Messageinput from './Messageinput'
import Nochat from './Nochat';
import useConversation from '../../strore/useConversation';


export default function MessageContainer(){
    
    const { selectedConversation, setselectedconversation } = useConversation();
    useEffect(() => {
        // Cleanup selectedConversation when component unmounts
        return () => {
            setselectedconversation(null);
        };
    }, [setselectedconversation]);

    return (
        <div className='md:min-w-[450px] flex flex-col'>

            {!selectedConversation ? (<Nochat />) : (
                <>
                    <div className='bg-slate-500 px-4 py-2 mb-2'>
                        <span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>{selectedConversation.fullname}</span>
                    </div>
                    <Mesages></Mesages>
                    <Messageinput></Messageinput>
                </>)}
        </div>
    )
}
