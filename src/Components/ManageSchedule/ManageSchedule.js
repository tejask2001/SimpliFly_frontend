import React from 'react'
import './ManageSchedule.css'
import GetSchedule from '../GetSchedule/GetSchedule'

export default function ManageSchedule() {
  return (
    <div>
      <div className="container-body">
        <div className="sidebar">
            <div className="sidebar-container">
            <div className="sidebar-options">
                Add Schedule
            </div>
            <div className="sidebar-options">
                Get Schedules
            </div>
            <div className="sidebar-options">
                Update Schedule
            </div>
            <div className="sidebar-options">
                Remove Schedule
            </div>
        </div>
        </div>
        <div className="container-main">
            <div className="add-schedule">
                
            </div>
            <div className="get-schedule">
                <GetSchedule/>
            </div>
            <div className="manage-schedule">

            </div>
        </div>
      </div>
    </div>
  )
}
