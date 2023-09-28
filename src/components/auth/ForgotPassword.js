import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import React, { useState } from 'react';
import { auth } from '../../config/firebase'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth();

    const forgotPassword = (e) => {
        e.preventDefault();
        sendPasswordResetEmail(auth, email)
            .then((useCredentials) => {
                alert("Email has been sent to reset password");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    };

    const NavSignUp = () => {
        navigate('/');
        // return redirect('/signup');
        // <SignUp />
    }
    return (
        <div className="forgot-password-container">
            <form onSubmit={forgotPassword}>
                <h1>Forgot Password</h1>
                <input
                    type='email'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
            </form>
            <button type='submit' onClick={forgotPassword}>Send Reset Email</button>
            <button type='submit' onClick={NavSignUp}>Back to login</button>
        </div>
    )
}

export default ForgotPassword;