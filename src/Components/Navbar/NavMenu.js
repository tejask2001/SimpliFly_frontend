import React from 'react'
import './NavMenu.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function NavMenu() {
    var isLoggedIn=sessionStorage.getItem("token")
    var navigate=useNavigate()
  return (
    <div>
      <div className="navbar-menu" id="nav-menu">
        <div className="back nav-menu-link">
          <div className="back-div" onClick={() => navigate(-1)}>
          <img src="https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color/254000/38-512.png" className="back-img"/>Back
        </div></div>
        <div className="home nav-menu-link" onClick={() => navigate('/home')}>Home</div>

        <div className="booking nav-menu-link" onClick={() => navigate('/about')}>About</div>
        {!isLoggedIn && <div className="account nav-menu-link" onClick={() => navigate('/login')}>Login</div>}
        {isLoggedIn && <div className="account nav-menu-link" onClick={() => navigate('/account')}>Account</div>}
        <div className="simplifly-txt">Simplifly</div>
      </div>
    </div>
  )
}
