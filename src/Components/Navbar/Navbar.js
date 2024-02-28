import './Navbar.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'

function Navbar(){
    var isLoggedIn=sessionStorage.getItem("token")
    var navigate=useNavigate()

    function navMenu(){
        var navbar=document.getElementById("navbar-main")
        var navbarMenu=document.getElementById("nav-menu")
       // var containerBody=document.getElementById("container-body")
        
        //containerBody.style.display="none";
        navbar.style.display="none";
        navbarMenu.style.display="flex";
    }
    
    function displayScreen(){
        var navbar=document.getElementById("navbar-main")
        var navbarMenu=document.getElementById("nav-menu")
        //var containerBody=document.getElementById("container-body")
        
        //containerBody.style.display="flex";
        navbar.style.display="flex";
        navbarMenu.style.display="none";
    }

    var Logout=()=>{
      sessionStorage.removeItem("username")
      sessionStorage.removeItem("role")
      sessionStorage.removeItem("userId")
      sessionStorage.removeItem("token")
      navigate('/')
    }

    return(
        <>
        <nav className="navbar bg-custom fixed-top" id="navbar-main">
        <div className="container-fluid">          
          <a className="navbar-brand logo">Simplyfly
            <img src="https://freepngimg.com/thumb/airplane/128541-flying-airplane-vector-free-transparent-image-hd.png" className="airplane-icon"/>
          </a>
          <ul className="navbar-nav nav-links">
            <li className="nav-item">
              <Link  className="nav-link" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link  className="nav-link" to="/about">About</Link>
            </li>
            {!isLoggedIn && (<li className="nav-item">
              <Link  className="nav-link" to="/login">Login</Link>
            </li>)}
            {isLoggedIn && (<li className="nav-item">
            <Link  className="nav-link" to="/userAccount">Account</Link>
            </li>)}
            {isLoggedIn && (<li className="nav-item">
              <a className="nav-link logout-btn" onClick={Logout}>Logout</a>
            </li>)}
            </ul>
            <button className="navbar-toggler link-btn" type="button" onClick={() => navigate('/navMenu')} id="menu-btn">
              <span className="navbar-toggler-icon"></span>
            </button>
            <Outlet/>
        </div>
      </nav>
      </>
    );
}

export default Navbar;