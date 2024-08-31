import React from 'react'
import Searchinput from './Searchinput'
import Conversations from './Conversations'
import Logout from './Logout'

export default function Sidebar() {
  return (
    <div className='flex flex-col border-r p-4 border-slate-500'>
        <Searchinput></Searchinput>
      <div className='divider px-3'></div>
      <Conversations></Conversations>
      <Logout></Logout>
    </div>
  )
}
