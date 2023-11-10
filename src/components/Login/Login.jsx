import React, { useContext, useEffect, useState } from "react";
import './Login.scss';
import { useNavigate } from "react-router-dom";
import { LogInContext } from "../Context/Context.jsx";
import { Button } from "@mui/material";

function Login() {
  const { 
    setUser, 
    setUserId, 
    email, 
    setEmail, 
    password, 
    setPassword,  
    setLoginButton
  } = useContext(LogInContext);

  const [allUsers, setAllUsers] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error');
        }
        return response.json();
      })
      .then(data => {
        setAllUsers(data);
      })
      .catch(error => {
        console.error('Error', error);
      });
  },[])

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    const savedUserId = localStorage.getItem('userId');
    const savedLoginStatus = localStorage.getItem('loginStatus');
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setLoginButton(savedLoginStatus)
      setUserId(savedUserId)
    }
    // eslint-disable-next-line
  }, []);

  const onSubmit = () => {
    setEmailError("")
    setPasswordError("")
// eslint-disable-next-line
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{1,5}$/.test(email)) {
        setEmailError("Please enter a valid email")   
    }

    if (email === "") {
      setEmailError("Please enter your email") 
    }

    if (password.length < 7) {
        setPasswordError("The password must be min 7 characters")
    }

    if (password === "") {
      setPasswordError("Please enter a password")
    }

    let foundUser = allUsers.find(user => email.toLowerCase().includes(user.email.toLowerCase()));

    if (foundUser && password === 'test123') {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      localStorage.setItem('userId', foundUser.id);
      localStorage.setItem('loginStatus', ("closed"))
      navigate("/posts");
      setUser(foundUser);
      setLoginButton("closed")
    } else {
      alert('Wrong username or password');
    }
  }

  return (
    <div className="login">
      <h1 className="login__title">Login</h1>
      <div className="login__input-container">
        <input
          value={email}
          placeholder="Enter your email"
          onChange={event => setEmail(event.target.value)}
          className="login__input-box" 
        />
        <label className="login__error">{emailError}</label>
      
        <input
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={event => setPassword(event.target.value)}
          className="login__input-box" 
        />
        <label className="login__error">{passwordError}</label>
      </div>

      <Button 
        variant="contained" 
        color="success" 
        onClick={onSubmit}
      >
        Submit
      </Button>
    </div>
  )
}

export default Login;