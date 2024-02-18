import React, { useState } from "react";
import axios from "axios";
import indigo from "../../Assets/Images/indigo.png";
import airIndia from "../../Assets/Images/airindia.png";
import vistara from "../../Assets/Images/vistara.png";
import "./GetFlight.css";

export default function GetFlight() {
  var [flights, setFlights] = useState([
    {
      airline: "",
      flightNumber: "",
      totalSeats: "",
      basePrice: "",
    },
  ]);

  var flightData = () =>
    axios
      .get("http://localhost:5256/api/Flight")
      .then(function (response) {
        setFlights(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
      
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
    <div>
      <button onClick={flightData}>Getdata</button>
      {flights.map((flight, index) => (
        <div key={index} className="flight-list-div">
          <div className="flight-list">
            <div className="airline">
              <img
                src={getAirlineImage(flight.airline)}
                className="airline-logo"
              />
              <h3>{flight.airline}</h3>
            </div>
            <div className="flight-number">
              Flight Number : <b>{flight.flightNumber}</b>
            </div>
          </div>
          <div className="other-detail-div">
            <div className="total-seats">
              Total Seats : <b>{flight.totalSeats}</b>
            </div>
            <div className="base-price">
              Base Price : <b>Rs. {flight.basePrice}</b>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
