import React, { useState } from 'react'
import'./ManageBookings.css'
import GetBookings from '../GetBookings/GetBookings'
import GetBookingHistory from '../GetBookings/GetBookingHistory'
import RefundRequest from '../RefundRequest/RefundRequest'

export default function ManageBooking() {
    const [booking,setBooking]=useState(true)
  const [cancelBooking,setCancelBooking]=useState(false)
  const [refundRequest,setRefundRequest]=useState(false)

  return (
    <div>
      <div className="container-body">
        <div className="sidebar manage-booking-sidebar">
            <div className="sidebar-container">
            <div className="sidebar-options booking-btn-div" onClick={()=>{
              setBooking(true);
              setCancelBooking(false);
              setRefundRequest(false);
            }}>
                Get Bookings
            </div>
            <div className="sidebar-options cancel-booking-btn-div" onClick={()=>{
              setBooking(false);
              setCancelBooking(true);
              setRefundRequest(false)
            }}>
                Booking History
            </div>
            <div className="sidebar-options cancel-booking-btn-div" onClick={()=>{
              setBooking(false);
              setCancelBooking(false);
              setRefundRequest(true)
            }}>
                Refund Request
            </div>
        </div>
        </div>
        <div className="container-main">
            {booking && <div className="get-bookings">
                <GetBookings/>
            </div>}
            {cancelBooking && <div className="get-bookings">
              <GetBookingHistory/>
            </div>}
            {refundRequest && <div className="get-bookings">
              <RefundRequest/>
            </div>}
        </div>
      </div>
    </div>
  )
}
