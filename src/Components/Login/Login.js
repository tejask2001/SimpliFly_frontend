import React, { useState } from 'react'
import './Login.css'
import background from '../../Assets/Images/plane.jpg'
import userImg from '../../Assets/Images/user.png'
import key from '../../Assets/Images/key.png'

export default function Login() {

  var [Username,setUsername]=useState()
  var [Password,setPassword]=useState()
  var user={}
  var Login=(e)=>{
      e.preventDefault();
      user.Username=Username;
      user.Password=Password
      user.role = "";
      user.token ="";
      var requestOptions={
        method : 'POST',
        headers : {'Content-Type':'application/json'},
        body : JSON.stringify(user)
      }

      fetch("http://localhost:5256/api/User/Login",requestOptions)
      .then(res=>res.json())
      .then(res=>{
        sessionStorage.setItem("token",res.token);
            sessionStorage.setItem("username",res.Username);
            alert("Login success - "+res.username);
      })
      .catch(err=>{console.log(err)})
  }

  return (
    <div>
      <div className='login-page'>
        <img src={background} className='background-img'/>
        <div className="login-div">
        <h3>Log into your account</h3>
        <form>
            <div className="username-div">
                <img src={userImg}/>
                <input type="text" id="username-input" placeholder="Enter your username" className="login-inputs"
                value={Username} onChange={(e)=>setUsername(e.target.value)}/>
            </div>
            <div className="password-div">
                <img src={key}/>
                <input type="password" id="password-input" placeholder="Enter your password" className="login-inputs" value={Password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <input type="submit" value="Login" id="login-btn" onClick={Login}/>
        </form>
        <p className='register-text'>Don't have account,<span id='registerhere-text'> Register here</span></p>
    </div>
      </div>
    </div>
  )
}
