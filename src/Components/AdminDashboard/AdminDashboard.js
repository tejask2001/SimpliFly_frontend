import React from 'react'
import './AdminDashboard.css'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboard() {
    
  var username=sessionStorage.getItem('username')
  var navigate=useNavigate()

  return (
    <div>
       <div className="background-img" id="background-img">
    <img src="https://th.bing.com/th/id/R.de415334320dd313b583016db0352e93?rik=iHHSrgXQCeK7Cg&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fNcdUsHW.jpg&ehk=84aqjyfivMaFvbNbc48qihAGay07WJUqdYjE1QfyZts%3d&risl=&pid=ImgRaw&r=0" className="sky-img"/>
    <h1>Hello {username}</h1>
  </div>
  <div className="fun-div" id="fun-div">
    <div className="child-div child-div-admin">
      <div className="owner-function" onClick={()=>navigate("/flightOwner/manageRoute")}>
        <img src="https://th.bing.com/th/id/OIP._VuUhY9gcQL-verM9mptnQHaHa?rs=1&pid=ImgDetMain" className="fun-img"/>
        <h4>Manage Route</h4>
      </div>
    </div>
    <div className="child-div child-div-admin">
      <div className="owner-function" onClick={()=>navigate("/admin/manageUser")}>
        <img src="https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png" className="fun-img"/>
        <h4>Manage Users</h4>
      </div>
    </div>
    <div className="child-div child-div-admin">
      <div className="owner-function" onClick={()=>navigate('/flightOwner/manageBooking')}>
      <img src="https://cdn-icons-png.flaticon.com/512/4406/4406665.png" className="fun-img"/>
      <h4>Manage Bookings</h4>
    </div>
    </div>
  </div>
    </div>
  )
}
