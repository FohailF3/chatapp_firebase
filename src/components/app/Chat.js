import React, { useContext, useEffect, useState } from 'react'
import Messages from './Messages'
import Inputa from './Input'
import ChatContext from '../../context/ChatContext';

const Chat = () => {
  const {data} = useContext( ChatContext );
  console.log("data chat", data)
  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>
          {data.user.displayName}
        </span>
      </div>
      <Messages />
      <Inputa />
    </div>
  )
}

export default Chat;