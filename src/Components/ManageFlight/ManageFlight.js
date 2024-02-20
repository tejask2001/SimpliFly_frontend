import React from 'react'
import './ManageFlight.css'
import Navbar from '../Navbar/Navbar'
import GetFlight from '../GetFlight/GetFlight'

export default function ManageFlight() {
  return (
    <div>
      <div className="container-body">
        <div className="sidebar">
            <div className="sidebar-container">
            <div className="sidebar-options">
                Add Flight
            </div>
            <div className="sidebar-options">
                Get Flights
            </div>
            <div className="sidebar-options">
                Update Flight
            </div>
            <div className="sidebar-options">
                Remove Flight
            </div>
        </div>
        </div>
        <div className="container-main">
            <div className="add-flight">
                
            </div>
            <div className="get-flight">
                <GetFlight/>
            </div>
            <div className="manage-schedule">

            </div>
        </div>
      </div>
    </div>
  )
}
