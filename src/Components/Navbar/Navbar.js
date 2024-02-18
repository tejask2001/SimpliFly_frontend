import './Navbar.css'

function Navbar(){
    
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

    return(
        <>
        <nav className="navbar bg-custom fixed-top" id="navbar-main">
        <div className="container-fluid">          
          <a className="navbar-brand logo">Simplyfly
            <img src="https://freepngimg.com/thumb/airplane/128541-flying-airplane-vector-free-transparent-image-hd.png" className="airplane-icon"/>
          </a>
          <ul className="navbar-nav nav-links">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Account</a>
            </li>
            </ul>
            <button className="navbar-toggler link-btn" type="button" onClick={navMenu} id="menu-btn">
              <span className="navbar-toggler-icon"></span>
            </button>
        </div>
      </nav>


      <div className="nav-menu" id="nav-menu">
        <div className="back nav-menu-link">
          <div className="back-div" onClick={displayScreen}>
          <img src="https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color/254000/38-512.png" className="back-img"/>Back
        </div></div>
        <div className="home nav-menu-link">Home</div>
        <div className="booking nav-menu-link">About</div>
        <div className="account nav-menu-link">Account</div>
        <div className="simplifly-txt">Simplifly</div>
      </div>
      </>
    );
}

export default Navbar;