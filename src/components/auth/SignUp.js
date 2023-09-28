import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [displayName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (useCredential) => {
        updateProfile(useCredential.user, {
          displayName: displayName,
        });
        await setDoc(doc(db, "users", useCredential.user.uid), {
          displayName,
          uid: useCredential.user.uid,
          email,
        });
        await setDoc(doc(db, "userChats", useCredential.user.uid), {});
        alert("Signed up successfully");

        navigate("/");
      })
      .catch((error) => {
        if (
          error == "FirebaseError: Firebase: Error (auth/email-already-in-use)."
        )
          alert("Email already in use, sign in instead");
      });
  };

  const backToSignIn = () => {
    navigate("/");
  };
  return (
    <div className="sign-up-container">
      <form onSubmit={signUp}>
        <h1>Register</h1>
        <input
          type="text"
          placeholder="Enter your name"
          value={displayName}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <button type="submit" onClick={signUp}>
        Sign Up
      </button>
      <button type="submit" onClick={backToSignIn}>
        Back to login
      </button>
    </div>
  );
};

export default SignUp;
