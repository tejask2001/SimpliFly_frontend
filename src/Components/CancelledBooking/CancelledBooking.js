import React, { useEffect, useState } from 'react'
import './CancelledBooking.css'

export default function CancelledBooking() {
    var[cancelledBooking,setCancelledBooking]=useState([])
    var userId = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("token");

    useEffect(()=>{
        fetch(`http://localhost:13304/api/Bookings/GetCancelledBookingByUserId`)
        .then((res)=>res.json())
        .then((res)=>{
            setCancelledBooking(res);
            console.log(res);
        })
    },[])
  return (
    <div className='cancelled-booking-div'>
      
    </div>
  )
}
