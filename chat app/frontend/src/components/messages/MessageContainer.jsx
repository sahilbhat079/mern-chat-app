import React from 'react'
import Mesages from './Mesages'
import Messageinput from './Messageinput'

export default function MessageContainer() {
    return (
        <div className='md:min-w-[450px] flex flex-col'>
            <>
                <div className='bg-slate-500 px-4 py-2 mb-2'>
                    <span className='label-text'>To:</span> <span className='text-gray-900 font-bold'> john doe</span>
                </div>
            </>

            <Mesages></Mesages>
            <Messageinput></Messageinput>

        </div>
    )
}
