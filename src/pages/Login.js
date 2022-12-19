import React from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuth }) => {
  // to move from page to another
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    // localStorage is a web storage object that enables developers to store data,and ensures that this data survives all page refreshes, even when a user closes or restarts a browser - and it has no expiration date
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };
  return (
    <div className="loginPage">
      <p>Sign in with Google to continue</p>
      <button onClick={signInWithGoogle} className="login-with-google-byn">
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
