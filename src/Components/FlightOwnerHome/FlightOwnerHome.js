import React from 'react'
import './FlightOwnerHome.css'

export default function FlightOwnerHome() {
  return (
    <div>
      <div className="background-img" id="background-img">
    <img src="https://images.pexels.com/photos/62623/wing-plane-flying-airplane-62623.jpeg?cs=srgb&dl=pexels-pixabay-62623.jpg&fm=jpg" className="sky-img"/>
    <h1>Hello Admin</h1>
  </div>
  <div className="fun-div" id="fun-div">
    <div className="child-div">
      <div className="owner-function">
        <img src="https://cdn-icons-png.flaticon.com/512/7893/7893979.png" className="fun-img"/>
        <h4>Manage Flights</h4>
      </div>
    </div>
    <div className="child-div">
      <div className="owner-function">
        <img src="https://cdn-icons-png.flaticon.com/512/25/25473.png" className="fun-img"/>
        <h4>Manage Fares</h4>
      </div>
    </div>
    <div className="child-div">
      <div className="owner-function">
        <img src="https://cdn-icons-png.flaticon.com/512/3652/3652191.png" className="fun-img"/>
        <h4>Manage Schedules</h4>
      </div>
    </div>
    <div className="child-div">
      <div className="owner-function">
      <img src="https://cdn-icons-png.flaticon.com/512/4406/4406665.png" className="fun-img"/>
      <h4>View Bookings</h4>
    </div>
    </div>
  </div>
    </div>
  )
}
