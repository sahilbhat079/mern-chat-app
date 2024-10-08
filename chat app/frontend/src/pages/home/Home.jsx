import React from 'react'
import Sidebar from '../../components/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'
import Nochat from '../../components/messages/Nochat'

function Home() {
  return (
    <div className='flex flex-col sm:flex-row sm:h-[350px] md:h-[450px] bg-gray-200 rounded-lg overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100
'>
      <Sidebar></Sidebar>
      <MessageContainer></MessageContainer>
      {/* <Nochat></Nochat> */}
    </div>
  )
}

export default Home
