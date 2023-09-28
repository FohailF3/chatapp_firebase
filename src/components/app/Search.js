import React, { useState } from 'react'
import { collection, query, where, getDoc, doc, setDoc, updateDoc, serverTimestamp, getDocs } from "firebase/firestore";
import { db } from '../../config/firebase'

const Search = () => {
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const handleSearch = async (e) => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );
    try {
      let querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      });
    } catch (error) {
      setError(true);
    }
  }

  const handleKey = e => {
    e.code === "Enter" && handleSearch();
  }

  const handleSelect = async () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName
          },
          [combinedId + ".date"]: serverTimestamp()
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName
          },
          [combinedId + ".date"]: serverTimestamp()
        });
      }
    } catch (err) {}
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
      );
      
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      } catch (error) {
        setError(true)
      }
      setUser(null);
      setUserName("");
  }

  return (
    <div className='search'>
      <div className='searchForm'>
        <input
          className='input'
          type='text'
          placeholder='Find user'
          onChange={e => setUserName(e.target.value)}
          onKeyDown={handleKey} 
          value={userName}/>
      </div>
      {error && <span>User not found</span>}
      {user && <div className='userChat' onClick={handleSelect}>
        <div className='userChatInfo'>
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search