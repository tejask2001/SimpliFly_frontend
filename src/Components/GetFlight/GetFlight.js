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

  const [currentPage, setCurrentPage] = useState(1);
  var [showFlight, setShowFlight] = useState(false)
  const [currFlight, setCurrFlight] = useState({})
  const flightsPerPage = 5;


  var [showFlightDetails, setShowFLightDetails] = useState(false);

  var [flightDetails, setFlightDetails] = useState([
    {
      airline: "",
      flightNumber: "",
      totalSeats: "",
      economySeatPrice: "",
      businessClassSeatPrice: "",
      premiumEconomySeatPrice: "",
      totalEconomySeats: "",
      totalPremiumEconomySeats: "",
      totalBusinessClassSeats: "",
    },
  ]);

  useState(() => {
    const token = sessionStorage.getItem("token");
    const httpHeader = {
      headers: { Authorization: "Bearer " + token },
    };
    axios
      .get("http://localhost:13304/api/Flight", httpHeader)
      .then(function (response) {
        setFlights(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
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

  function ShowFlightDetail(flight) {
    setShowFLightDetails(true);

    flightDetails.airline = flight.airline;
    flightDetails.flightNumber = flight.flightNumber;
    flightDetails.status = flight.status;
    flightDetails.totalSeats =
      flight.totalBusinessClassSeats +
      flight.totalEconomySeats +
      flight.totalPremiumEconomySeats;
    flightDetails.totalBusinessClassSeats = flight.totalBusinessClassSeats;
    flightDetails.totalEconomySeats = flight.totalEconomySeats;
    flightDetails.totalPremiumEconomySeats = flight.totalEconomySeats;
    flightDetails.economySeatPrice = flight.economySeatPrice;
    flightDetails.premiumEconomySeatPrice = flight.premiumEconomySeatPrice;
    flightDetails.businessClassSeatPrice = flight.businessClassSeatPrice;
  }

  function handleFlight(flight){
    setShowFlight(true);
    setCurrFlight(flight)
 }

 function handleBack(){
   setShowFlight(false)
}

 const indexOfLastFlight = currentPage * flightsPerPage;
 const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
 const currentFlights = flights.slice(indexOfFirstFlight, indexOfLastFlight);

 const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <>
      <div className="get-flight-div">
        <div className="get-flight-options"></div>
        {!showFlight && currentFlights.map((flight, index) => (
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
                Status : <b>{flight.status}</b>
              </div>
              <div className="total-seats">
                Total Seats :{" "}
                <b>
                  {flight.totalEconomySeats +
                    flight.totalPremiumEconomySeats +
                    flight.totalBusinessClassSeats}
                </b>
              </div>
              <button onClick={() => ShowFlightDetail(flight)} className="get-details-btn">
                Get Details
              </button>
            </div>
          </div>
        ))}
         {!showFlight && <div className="pagination">
            {flights.length > flightsPerPage && (
              <button onClick={() => paginate(currentPage - 1)} className="previous-btn">Previous</button>
            )}
            {flights.length > indexOfLastFlight && (
              <button onClick={() => paginate(currentPage + 1)}  className="next-butn">Next</button>
            )}
          </div>
      }
      
      </div>
      {showFlightDetails && (
        <div className="show-flight-details">
          <div className="flight-details-new">
            <div className="flight-details-new-col">
            <div>
                Flight Number : <b>{flightDetails.flightNumber}</b>
              </div>
              <div>Status : <b>{flightDetails.status}</b></div>
              <div>Economy Seats : <b>{flightDetails.totalEconomySeats}</b></div>
              <div>Premium Economy Seats :{" "}
              <b>{flightDetails.totalPremiumEconomySeats}</b></div>
              <div>Business Class Seats :{" "}
            <b>{flightDetails.totalBusinessClassSeats}</b></div>
            </div>

            <div className="flight-details-new-col">
            <div className="airline">
                <img
                  src={getAirlineImage(flightDetails.airline)}
                  className="airline-logo"
                />
                <h3>{flightDetails.airline}</h3>
            </div>
            <div>Total Seats : <b>{flightDetails.totalSeats}</b></div>
            <div>Economy Price : <b>Rs. {flightDetails.economySeatPrice}</b></div>
            <div>Premium Economy Price :{" "}
              <b>Rs. {flightDetails.premiumEconomySeatPrice}</b></div>
              <div>Business Class Price :{" "}
            <b>Rs. {flightDetails.businessClassSeatPrice}</b></div>            
            </div> 
          </div>
          <button
              onClick={() => setShowFLightDetails(false)}
              className="close-flight-details"
            >
              close
            </button>
        </div>
      )}
    </>
  );
}
