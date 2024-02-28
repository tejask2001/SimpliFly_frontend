import React, { useState } from 'react'
import './GetFlightOwner.css'
import axios from 'axios'

export default function GetFlightOwner() {
    var [flightOwner,setFlightOwner]=useState([])


    useState(() => {
        const token=sessionStorage.getItem('token')
        const httpHeader={
          headers:{'Authorization':'Bearer '+token}
      }

        fetch("http://localhost:5256/api/admin/dashboard/Users/AllFlightOwners",httpHeader)
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            setFlightOwner(res);
          });
      });

    var DeleteFlightOwner=()=>{
        
    }
  return (
    <div className='getflightOwner-div'>
      <div className='get-flightOwner-div'>
        {flightOwner.map((user, index) => (
        <div key={index} className="flightOwner-list-div">
            <div className='user-name-div flightOwner-row'><p>Name : </p>{user.name}</div>           
            <div className='user-email-div flightOwner-row'><p>Email : </p>{user.email}</div>
            <div className='user-phone-div flightOwner-row'><p>Phone : </p>{user.contactNumber}</div>
            <div className='user-gender-div flightOwner-row'><p>Company Name : </p>{user.companyName}</div> 
            <div className='delete-user-btn' onClick={DeleteFlightOwner}>X</div>
        </div>))}
      </div>
    </div>
  )
}
