import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState, useContext } from 'react'
import { db } from '../../config/firebase';
import { ChatContext } from '../../context/ChatContext';

const Chats = () => {

  const [chats, setChats] = useState([])

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const {dispatch} = useContext( ChatContext )

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  });

  const handleSelect = (userDispatch) => {
    dispatch({ type: "CHANGE_USER", payload: userDispatch})
  }

  return (
    <div className='chats'>
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div className='userChat' key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
        <div className='userChatInfo'>
          <span className='name'>{chat[1].userInfo.displayName}</span>
          <p className='message'>{chat[1].lastMessage?.text}</p>
        </div>
      </div>
        ))}
    </div>
  )
}

export default Chats