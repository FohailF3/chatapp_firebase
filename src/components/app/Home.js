import React from 'react'
import Chat from './Chat'
import Sidebar from './Sidebar'

const home = () => {
  return (
    <div className='home'>
        <div className='container'>
            <Sidebar />
            <Chat />
        </div>
    </div>
  )
}

export default home