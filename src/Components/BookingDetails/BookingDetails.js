import React from 'react'
import './BookingDetails.css'
import { useSelector } from 'react-redux'

export default function BookingDetails() {

  var selectedFlight=useSelector((state)=>state.selectedFlight)
  return (
    <div className='booking-details-page'>
      <div className='flight-detail-div'>
        {selectedFlight.flightNumber} {selectedFlight.scheduleId}
      </div>
    </div>
  )
}
