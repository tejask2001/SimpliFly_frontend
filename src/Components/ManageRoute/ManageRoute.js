import React from 'react'
import './ManageRoute.css'
import GetRoute from '../GetRoute/GetRoute'

export default function ManageRoute() {
  return (
    <div>
      <div className="container-body">
        <div className="sidebar">
            <div className="sidebar-container">
            <div className="sidebar-options">
                Add Route
            </div>
            <div className="sidebar-options">
                Get Routes
            </div>
            <div className="sidebar-options">
                Update Route
            </div>
            <div className="sidebar-options">
                Remove Route
            </div>
        </div>
        </div>
        <div className="container-main">
            <div className="add-routes">
                
            </div>
            <div className="get-routes">
                <GetRoute/>
            </div>
            <div className="manage-routes">

            </div>
        </div>
      </div>
    </div>
  )
}
