import React, { useEffect, useState } from 'react'
import './CustomerBooking.css'
import indigo from "../../Assets/Images/indigo.png";
import airIndia from "../../Assets/Images/airindia.png";
import vistara from "../../Assets/Images/vistara.png";
import axios from 'axios';


export default function CustomerBookingHistory() {
    var [bookings,setBookings]=useState([])
  var userId=sessionStorage.getItem("userId")
  var [userBookings,setUserBookings]=useState([])
  const token = sessionStorage.getItem("token");
  

  useEffect(() => {
    const httpHeader = {
      headers: { Authorization: "Bearer " + token },
    };
    axios
      .get(
        `http://localhost:13304/api/users/GetBookingByCustomerId?customerId=${userId}`,
        httpHeader
      )
      .then(function (response) {  
        const sortBookings = response.data.sort((a, b) => new Date(b.bookingTime) - new Date(a.bookingTime));
        const pastBookings = sortBookings.filter(a => new Date(a.schedule.departure) < new Date());
        setUserBookings(pastBookings);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useState(() => {
    fetch(`http://localhost:13304/api/users/GetPassengerBookingByCustomerId?customerId=${userId}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);        
        setBookings(res)
        const pastBookings = res.filter(a => new Date(a.booking.schedule.departure) < new Date());
        setBookings(pastBookings)
      });
  });
//const pastBookings = res.filter(a => new Date(a.schedule.departure) < new Date());
        //setBookings(pastBookings)

  function getPassenger(bookingIds){
    var passenger=[] 
    bookings.map(booking=>{
      if(booking.bookingId===bookingIds){
        passenger.push(booking)
      }
    })
    console.log(passenger)
    return passenger
  }

  function getDate(date){
    const formattedDate = date.toLocaleDateString(); 
    const formattedTime = date.toLocaleTimeString();
    return { formattedDate, formattedTime };
  }
  function getTimeDifference(departure,arrival){
    const arrivalTime = new Date(arrival);
    const departureTime = new Date(departure);
    const timeDifference = arrivalTime - departureTime;

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    return hours+":"+minutes+" hours"
  }

  const getAirlineImage = (airline) => {
    airline = airline.toLowerCase();
    switch (airline) {
      case "indigo":
        return indigo;
      case "air india":
        return airIndia;
      case "vistara":
        return vistara;
      default:
        return indigo;
    }
  };
    
  return (
    <div className="bookings-div">
    <div className="get-bookings-div">
      {userBookings.map((booking, index) => (
        <div key={index} className="booking-list-div">
          <div className="booking-schedule-details">
            <div className="booking-flight-detail">
              <img
                src={getAirlineImage(booking.schedule.flight.airline)}
                className="airline-logo"
              />
              <div>
                <p className="-bookingflight-details">
                  {booking.schedule.flight.airline}
                </p>
                <p className="booking-flight-details">
                  {booking.schedule.flightId}
                </p>
              </div>
            </div>
            <div className="flight-source">
              <p className="flight-details">
                {booking.schedule.route.sourceAirport.city}
              </p>
              <p className="flight-details">
                {getDate(new Date(booking.schedule.departure)).formattedTime}
              </p>
            </div>
            <p className="time-diff">
              {getTimeDifference(
                booking.schedule.departure,
                booking.schedule.arrival
              )}<br/>
              {getDate(new Date(booking.schedule.departure)).formattedDate}
            </p>
            <div className="flight-destination">
              <p className="flight-details">
                {booking.schedule.route.destinationAirport.city}
              </p>
              <p className="flight-details">
                {getDate(new Date(booking.schedule.arrival)).formattedTime}
              </p>
            </div>
          </div>
          <div className="booking-passenger-details">
          <div className='passengerDiv'>{getPassenger(booking.id).map((booking, index) => (
              <div key={index}>
              Passenger {index+1} : {booking.passenger.name}<br/>
              </div>
            ))
            }
          </div>
              <div>
                Booking Date :{" "}
                <b>{getDate(new Date(booking.bookingTime)).formattedDate}</b>
              </div> 
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}
