import React, { useContext, useState } from 'react'
import { collection, query, where, getDoc, doc, setDoc, updateDoc, serverTimestamp, getDocs } from "firebase/firestore";
import { db } from '../../config/firebase'

const Search = () => {
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  // const currentUser = useContext(returnUser)
  const handleSearch = async (e) => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );
    try {
      // console.log("try")
      let querySnapshot = await getDocs(q);
      // querySnapshot=[...querySnapshot]
      // console.log('query',querySnapshot)
      querySnapshot.forEach((doc) => {
        // console.log('Im in')
        setUser(doc.data())
      });
    } catch (error) {
      // console.log("error")
      setError(true);
    }
  }

  const handleKey = e => {
    e.code === "Enter" && handleSearch();
  }

  const handleSelect = async () => {
    console.log("handle select");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try {
      console.log("combinedId", combinedId)
      const res = await getDoc(doc(db, "chats", combinedId));
      console.log("responseb", res)
      if (!res.exists()) {
        console.log("response", res)
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName
          },
          [combinedId + ".date"]: serverTimestamp()
        });
        // console.log("user", user);

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName
          },
          [combinedId + ".date"]: serverTimestamp()
        });
      }
    } catch (err) {}
    // console.log("curent user", user.uid)
    // console.log("currentUser in search", currentUser.uid);
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
      );
      
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
          // console.log(doc.id, "=>", doc.data())
        });
      } catch (error) {
        setError(true)
      }
      setUser(null);
      setUserName("");

    // const res = await getDocs(doc(db, "chats",))
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