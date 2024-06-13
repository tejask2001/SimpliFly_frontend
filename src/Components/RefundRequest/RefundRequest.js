import React, { useEffect, useState } from 'react'
import './RefundRequest.css'

export default function RefundRequest() {
    var [refundRequest,setRefundRequest]=useState([])

    useEffect(()=>{
        fetch(`http://localhost:13304/api/Bookings/GetRefundRequest`)
        .then((res)=>res.json())
        .then((res)=>{
            setRefundRequest(res);
            console.log(res);
        })
    },[])

    function getDate(date) {
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();
        return { formattedDate, formattedTime };
      }

      function ChangeRefundStatus(id){
        const token = sessionStorage.getItem("token");
        var RequestOption = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
  
        fetch(
          `http://localhost:13304/api/Bookings/ChangeRefundStatus?id=${id}`,
          RequestOption
        )
          .then((res) => res.json())
          .then((res) => {
            alert("Refund request sent");
          })
          .catch((err) => {
            console.error("Error:", err);
            alert("Error sending request");
          });
      }

  return (
    <div className='cancelled-booking-div'>
        <table className='cancel-table'>
            <tbody>
                <tr>
                    <th>Sr. No.</th>
                    <th>Source</th>
                    <th>Destination</th>
                    <th>Departure date</th>
                    <th>Passenger Name</th>
                    <th></th>
                </tr>
                {refundRequest.map((booking,index)=>(
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{booking.schedule.route.sourceAirport.city}</td>
                        <td>{booking.schedule.route.destinationAirport.city}</td>
                        <td>{getDate(new Date(booking.schedule.departure)).formattedDate}</td>
                        <td>{booking.passengerName}</td>
                        <td><button className='refund-btn' onClick={()=>ChangeRefundStatus(booking.id)}>Refund Amount</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}
