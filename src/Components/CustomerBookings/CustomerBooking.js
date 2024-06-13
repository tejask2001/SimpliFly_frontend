import React, { useEffect, useState } from "react";
import "./CustomerBooking.css";
import indigo from "../../Assets/Images/indigo.png";
import airIndia from "../../Assets/Images/airindia.png";
import vistara from "../../Assets/Images/vistara.png";
import axios from "axios";
import jsPDF from "jspdf";
import JsBarcode from "jsbarcode";

export default function CustomerBooking() {
  var [bookings, setBookings] = useState([]);
  var [userBookings, setUserBookings] = useState([]);
  var [cancelBookingId, setCancelBookingId] = useState();
  var [displayCancelBtn,setDisplayCancelBtn]=useState(true)
  var userId = sessionStorage.getItem("userId");
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
        const sortBookings = response.data.sort(
          (a, b) => new Date(b.bookingTime) - new Date(a.bookingTime)
        );
        const pastBookings = sortBookings.filter(
          (a) => new Date(a.schedule.departure) > new Date()
        );
        setUserBookings(pastBookings);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useState(() => {
    fetch(
      `http://localhost:13304/api/users/GetPassengerBookingByCustomerId?customerId=${userId}`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setBookings(res);
      });
  });

  function getDate(date) {
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return { formattedDate, formattedTime };
  }
  function getTimeDifference(departure, arrival) {
    const arrivalTime = new Date(arrival);
    const departureTime = new Date(departure);
    const timeDifference = arrivalTime - departureTime;

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    return hours + ":" + minutes + " hours";
  }

  function getPassenger(bookingIds) {
    var passenger = [];
    bookings.map((booking) => {
      if (booking.bookingId === bookingIds) {
        passenger.push(booking);
      }
    });
    console.log(passenger);
    return passenger;
  }

  function DisplayCancelOption(index,bookingId) {
    var cancelBookingId = "cancel-container" + index;
    var cancelContainer = document.getElementById(cancelBookingId);
    cancelContainer.style.display = "flex";

    var passengers=getPassenger(bookingId);
    console.log(passengers.length)
    if(passengers.length<2){
      console.log("hello")
      setDisplayCancelBtn(false)
    }
    else{
      setDisplayCancelBtn(true)
    }
  }

  function HideCancelOption(index) {
    var cancelBookingId = "cancel-container" + index;
    var cancelContainer = document.getElementById(cancelBookingId);
    cancelContainer.style.display = "none";
  }

  function CancelPassengerBooking(passengerBookingId) {
    const confirmDelete = window.confirm(
      `Are you sure you want to cancel booking?`
    );
    if (confirmDelete) {
      const token = sessionStorage.getItem("token");
      var RequestOption = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };

      fetch(
        `http://localhost:13304/api/users/CancelBookingByPassenger?passengerId=${passengerBookingId}`,
        RequestOption
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          alert("Booking cancelled successfully");
        })
        .catch((err) => {
          console.error("Error:", err);
          alert("Error canceling booking.");
        });
    }
  }

  function CancelBooking(bookingId) {
    console.log(bookingId)
    const confirmDelete = window.confirm(
      `Are you sure you want to cancel booking?`
    );
    if (confirmDelete) {
      const token = sessionStorage.getItem("token");
      var RequestOption = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };

      fetch(
        `http://localhost:13304/api/Bookings/CancelBooking?bookingId=${bookingId}`,
        RequestOption
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          alert("Booking cancelled successfully");
        })
        .catch((err) => {
          console.error("Error:", err);
          alert("Error canceling booking.");
        });
    }
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

  const downloadTicket = (booking) => {
    const doc = new jsPDF();
    
    // Set background color
    doc.setFillColor(244,229,215,255); // White background

    doc.addImage('https://th.bing.com/th/id/OIP.Tf9EZ4MolP16U--kX_h-swHaLH?rs=1&pid=ImgDetMain', 'JPEG', 0, 0, 210, 297);
    
    // Ticket header
   
    doc.setFontSize(20);
    doc.setTextColor(0); // Black text color
    doc.text("Boarding Pass", 100, 25, null, null, 'center');
    
    // Airline and flight details
    doc.setFontSize(12);
    doc.text(`Airline: ${booking.booking.schedule.flight.airline}`, 20, 55); // Position airline name before image
    const airlineImage = getAirlineImage(booking.booking.schedule.flight.airline);
    doc.addImage(airlineImage, 'PNG', 55, 46, 15, 15); // Add airline image
    doc.text(`Flight Number: ${booking.booking.schedule.flightNumber}`, 20, 65);
    doc.text(`From: ${booking.booking.schedule.route.sourceAirport.city}`, 20, 75);
    doc.text(`To: ${booking.booking.schedule.route.destinationAirport.city}`, 20, 85);
    doc.text(`Departure: ${getDate(new Date(booking.booking.schedule.departure)).formattedDate} ${getDate(new Date(booking.booking.schedule.departure)).formattedTime}`, 20, 95);
    doc.text(`Arrival: ${getDate(new Date(booking.booking.schedule.arrival)).formattedDate} ${getDate(new Date(booking.booking.schedule.arrival)).formattedTime}`, 20, 105);
    doc.text(`Gate: ${Math.floor(Math.random() * 10)}`, 20, 115); // Random gate number
    doc.text(`Seat: ${booking.seatDetail.seatNumber} (${booking.seatDetail.seatClass})`, 20, 125);
    
    // Passenger details
    doc.text(`Passenger: ${booking.passenger.name}`, 100, 55);
    doc.text(`Age: ${booking.passenger.age}`, 100, 65);
    
    const barcodeValue = `${booking.booking.schedule.flightNumber}${booking.booking.bookingTime}`;
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, barcodeValue, {
      format: 'CODE128',
      displayValue: false,
      margin: 0,
      width: 1,
      height: 40
    });
  
    // Add barcode image to PDF
    const barcodeDataURL = canvas.toDataURL('image/jpeg');
    doc.addImage(barcodeDataURL, 'JPEG', 120, 85, 70, 30);
    
    // Boarding pass details
    doc.setFontSize(8);
    doc.text("This is your boarding pass. Please keep it safe and handy during your journey.", 100, 145, null, null, 'center');
    
    // Footer
    doc.setLineWidth(0.5);
    doc.line(10, 150, 200, 150);
    doc.setFontSize(10);
    doc.text("Thank you for flying with us!", 100, 155, null, null, 'center');
    
    doc.save('boarding-pass.pdf');
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

              <div
                className="delete-user-btn"
                onClick={() => DisplayCancelOption(index,booking.id)}
              >
                X
              </div>
            </div>
            <div className="booking-passenger-details">
              <div className="passengerDiv">
                {getPassenger(booking.id).map((booking, index) => (
                  <div key={index}>
                    <b>Passenger {index + 1} :</b> {booking.passenger.name} &nbsp; &nbsp;
                    <b>Seat No. :</b> {booking.seatDetail.seatNumber}
                    <br />
            <button onClick={()=>downloadTicket(booking)} className="download-btn">Download</button>
                  </div>
                ))}
              </div>
              <div>
                Booking Date :{" "}
                <b>{getDate(new Date(booking.bookingTime)).formattedDate}</b>
              </div>
            </div>
            <div
              className="cancel-ticket-container"
              id={"cancel-container" + index}
            >
              <div className="cancel-ticket-div" id="cancel-booking">
                <p
                  className="cancel-btn"
                  onClick={() => HideCancelOption(index)}
                >
                  X
                </p>
                <div className="booking-schedule-details flight-details">
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
                      {
                        getDate(new Date(booking.schedule.departure))
                          .formattedTime
                      }
                    </p>
                  </div>
                  <p className="time-diff">
                    {getTimeDifference(
                      booking.schedule.departure,
                      booking.schedule.arrival
                    )}
                  </p>
                  <div className="flight-destination">
                    <p className="flight-details">
                      {booking.schedule.route.destinationAirport.city}
                    </p>
                    <p className="flight-details">
                      {
                        getDate(new Date(booking.schedule.arrival))
                          .formattedTime
                      }
                    </p>
                  </div>
                </div>
                <div className="booking-passenger-details">
                  <div className="passengerDiv">
                    {getPassenger(booking.id).map((booking, index) => (
                      <div className="passenger-name-div" key={index}>
                        Passenger {index + 1} : {booking.passenger.name}
                        <br />
                        {displayCancelBtn && <div
                          className="cancel-passenger-btn"
                          onClick={() => CancelPassengerBooking(booking.id)}
                        >
                          Cancel
                        </div>}
                      </div>
                    ))}
                  </div>
                  <div>
                    Booking Date :{" "}
                    <b>
                      {getDate(new Date(booking.bookingTime)).formattedDate}
                    </b>
                    
                  </div>
                </div>
                <button className="cancel-booking-btn" onClick={()=>CancelBooking(booking.id)}>Cancel Booking</button>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
