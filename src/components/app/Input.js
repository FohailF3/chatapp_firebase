import React, { useContext, useState } from 'react'
import ChatContext from '../../context/ChatContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { v4 as uuid } from 'uuid';

const Input = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { data } = useContext(ChatContext);

  const [text, setText] = useState("");

  const handleSend = async() => {
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(), 
        text, 
        senderId: currentUser.uid,
        date: Timestamp.now()
      })
    });

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp()
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp()
    });

    setText("");
  };

  return (
    <div className='input'>
        <input className='inputText' type="text" placeholder="Type Something ..." onChange={e=>setText(e.target.value)} value={text}/>
        <div>
            <button className='send' onClick={handleSend}>Send</button>
        </div>
    </div>
  )
}

export default Input