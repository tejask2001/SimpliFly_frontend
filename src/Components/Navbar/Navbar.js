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

    function Home(){
      if(sessionStorage.getItem('role')==='admin'){
        navigate("/admin/home");
      }
      else if (sessionStorage.getItem("role") == "flightOwner") {
        navigate("/flightOwner/home");
      }
      else{
        navigate('/home')
      }
    }

    var Logout=()=>{
      const confirmDelete = window.confirm(`Are you sure you want to Logout?`);
        if(confirmDelete){
          sessionStorage.removeItem("username")
          sessionStorage.removeItem("role")
          sessionStorage.removeItem("userId")
          sessionStorage.removeItem("token")
          navigate('/')
        }
      
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
              <a  className="nav-link home-btn" onClick={Home}>Home</a>
            </li>
            <li className="nav-item">
              <Link  className="nav-link" to="/about">About</Link>
            </li>
            {!isLoggedIn && (<li className="nav-item">
              <Link  className="nav-link" to="/login">Login</Link>
            </li>)}
            {isLoggedIn && (<li className="nav-item">
            <Link  className="nav-link" to="/user/userAccount">Account</Link>
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