import React, { useContext, useEffect, useRef } from 'react'
import ChatContext from '../../context/ChatContext';

const Message = ({message}) => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect = () => {
    ref.current?.scrollIntoView({
      behaviour: "smooth"
    },[message])
  }

  console.log("date", data);
  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
        <div className='messageInfo'>
            <span>Fohailmessageinfo</span>
            <span className='messageInfoTime'>just now</span>
        </div>
        <div className='messageContent'>
            <span className='messageSpan'>{message.text}</span>
        </div>
    </div>
  )
}

export default Message;