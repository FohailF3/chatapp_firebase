import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import React, { useState } from 'react';
import { auth } from '../../config/firebase'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth();

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((useCredentials) => {
                navigate('home');
            })
            .catch((error) => {
                if(error == "FirebaseError: Firebase: Error (auth/wrong-password)."){
                    alert("Wrong Password");
                }
                else if(error == "FirebaseError: Firebase: Error (auth/user-not-found)."){
                    alert("User does not exist, sign up instead")
                }

            });
    };

    const ForgotPassword = () => {
        navigate('reset');
    }

    const NavSignUp = () => {
        navigate('signup');
    }
    return (
        <div className="signInContainer">
            <form onSubmit={signIn}>
                <h1>Log In</h1>
                <input
                    type='email'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <input
                    type='password'
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
            </form>
            <button type='submit' onClick={signIn}>Log In</button>
            <p className="resetButton" onClick={ForgotPassword}>Forgot Password?</p>
            <h1>OR</h1>
            <button onClick={NavSignUp} >SignUp</button>
        </div>
    )
}

export default SignIn;