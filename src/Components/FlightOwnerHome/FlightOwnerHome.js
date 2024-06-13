import React from 'react'
import './FlightOwnerHome.css'
import { useNavigate } from 'react-router-dom'

export default function FlightOwnerHome() {
  var navigate=useNavigate()
  var username=sessionStorage.getItem('username')
  return (
    <div>
      <div className="background-img" id="background-img">
    <img src="https://th.bing.com/th/id/R.de415334320dd313b583016db0352e93?rik=iHHSrgXQCeK7Cg&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fNcdUsHW.jpg&ehk=84aqjyfivMaFvbNbc48qihAGay07WJUqdYjE1QfyZts%3d&risl=&pid=ImgRaw&r=0" className="sky-img"/>
    <h1>Hello {username}</h1>
  </div>
  <div className="fun-div" id="fun-div">
    <div className="child-div">
      <div className="owner-function" onClick={()=>navigate("/flightOwner/manageFlight")}>
        <img src="https://cdn-icons-png.flaticon.com/512/7893/7893979.png" className="fun-img"/>
        <h4>Manage Flights</h4>
      </div>
    </div>
    <div className="child-div">
      <div className="owner-function" onClick={()=>navigate("/flightOwner/manageRoute")}>
        <img src="https://th.bing.com/th/id/OIP._VuUhY9gcQL-verM9mptnQHaHa?rs=1&pid=ImgDetMain" className="fun-img"/>
        <h4>Manage Route</h4>
      </div>
    </div>
    <div className="child-div">
      <div className="owner-function" onClick={()=>navigate("/flightOwner/manageSchedule")}>
        <img src="https://cdn-icons-png.flaticon.com/512/3652/3652191.png" className="fun-img"/>
        <h4>Manage Schedules</h4>
      </div>
    </div>
    <div className="child-div">
      <div className="owner-function" onClick={()=>navigate('/flightOwner/manageBooking')}>
      <img src="https://cdn-icons-png.flaticon.com/512/4406/4406665.png" className="fun-img"/>
      <h4>Manage Bookings</h4>
    </div>
    </div>
  </div>
    </div>
  )
}
