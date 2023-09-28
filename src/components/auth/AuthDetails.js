import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../config/firebase'
import { useNavigate } from 'react-router-dom'

const AuthDetails = () => {
    const [authUser, setAuthUser] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setAuthUser(currentUser);
                // console.log("auth user",currentUser);
                localStorage.setItem("currentUser", JSON.stringify(currentUser));
            }
            else {
                setAuthUser(null);
            }
        })
    }, []);

    const userSignOut = () => {
        signOut(auth).then(() => {
            navigate('/');
            alert("Signed out successfully");
        }).catch(error => console.log("error"))
    }
    return (
        <div className="authdetail">{authUser ? <><p>{`${authUser.displayName}`}</p><button onClick={userSignOut} >Sign Out</button></> : <p>Signed Out</p>}</div>
    );
}
// const returnUser = () => {
//     return (
//         currentUserId
//     )
// }

export default AuthDetails;