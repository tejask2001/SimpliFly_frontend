import React, { useState } from 'react'
import './ManageFlight.css'
import Navbar from '../Navbar/Navbar'
import GetFlight from '../GetFlight/GetFlight'
import AddFlight from '../AddFlight/AddFlight'
import UpdateFlight from '../UpdateFlight/UpdateFlight'
import DeleteFlight from '../DeleteFlight/DeleteFlight'

export default function ManageFlight() {
  const [addFlight,setAddFlight]=useState(true)
  const [getFlight,setGetFlight]=useState(false)
  const [updateFlight,setUpdateFlight]=useState(false)
  const [deleteFlight,setDeleteFlight]=useState(false)
  return (
    <div>
      <div className="container-body">
        <div className="sidebar">
            <div className="sidebar-container">
            <div className="sidebar-options" onClick={()=>{
              setAddFlight(true);
              setGetFlight(false);
              setUpdateFlight(false)
              setDeleteFlight(false)
            }}>
                Add Flight
            </div>
            <div className="sidebar-options" onClick={()=>{
              setAddFlight(false);
              setGetFlight(true);
              setUpdateFlight(false)
              setDeleteFlight(false)
            }}>
                Get Flights
            </div>
            <div className="sidebar-options" onClick={()=>{
              setAddFlight(false);
              setGetFlight(false);
              setUpdateFlight(true)
              setDeleteFlight(false)
            }}>
                Update Flight
            </div>
            <div className="sidebar-options" onClick={()=>{
              setAddFlight(false);
              setGetFlight(false);
              setUpdateFlight(false)
              setDeleteFlight(true)
            }}>
                Remove Flight
            </div>
        </div>
        </div>
        <div className="container-main">
            {addFlight && <div className="add-flight">
                <AddFlight/>
            </div>}
            {getFlight && <div className="get-flight">
                <GetFlight/>
            </div>}
            {updateFlight && <div className="update-flight">
                <UpdateFlight/>
            </div>}
            {deleteFlight && <div className="delete-flight">
                <DeleteFlight/>
            </div>}
        </div>
      </div>
    </div>
  )
}
