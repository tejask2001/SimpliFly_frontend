import React, { useState } from "react";
import "./AddSchedule.css";
import axios from "axios";

export default function AddSchedule() {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  const minDateTime = currentDate.toISOString().slice(0, 16);

  var [sourceAirport, setSourceAirport] = useState();
  var [destinationAirport, setDestinationAirport] = useState();
  var [flightNumber, setFlightNumber] = useState();
  var [departureTime, setDepartureTime] = useState();
  var [arrivalTime, setArrivalTime] = useState();
  var [routeId, setRouteId] = useState();
  var [airports, setAirports] = useState([]);
  var [routes, setRoutes] = useState([]);
  var addScheduleDetails = {};

  var [flights, setFlights] = useState([]);

  const token = sessionStorage.getItem("token");

  useState(() => {
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
  }, []);

  var AddNewSchedule = (e) => {
    if (flightNumber === "0") {
      alert("Select flight number");
      return;
    }
    if (departureTime === arrivalTime) {
      alert("departure and arrival time cannot be same");
      return;
    }
    e.preventDefault();
    addScheduleDetails.flightId = flightNumber;
    departureTime = new Date(departureTime).toISOString();
    addScheduleDetails.departure = departureTime;
    arrivalTime = new Date(arrivalTime).toISOString();
    addScheduleDetails.arrival = arrivalTime;
    addScheduleDetails.routeId = routeId;
    console.log(addScheduleDetails);

    const token = sessionStorage.getItem("token");

    var requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    console.log("here");
    var RequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(addScheduleDetails),
    };
    fetch("http://localhost:13304/api/Schedule", RequestOptions)
      .then((res) => res.json())
      .then((res) => {
        console.log("Response:", res);
        alert("Schedule added successfully");
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Error adding schedule.");
      });
  };

  var requestOption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  useState(() => {
    fetch("http://localhost:13304/api/Route", requestOption)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setRoutes(res);
        console.log(routes);
      });
  });

  useState(() => {
    fetch("http://localhost:13304/api/Route/GetAirports")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setAirports(res);
      });
  });

  const handleFlightNumberChange = (e) => {
    setFlightNumber(e.target.value);
  };
  const handleSourceAirportChange = (e) => {
    setSourceAirport(e.target.value);
  };
  const handleDestinationAirportChange = (e) => {
    setDestinationAirport(e.target.value);
  };
  const handleDepartureTimeChange = (e) => {
    setDepartureTime(e.target.value);
  };
  const handleArrivalTimeChange = (e) => {
    setArrivalTime(e.target.value);
  };

  return (
    <div className="add-schedule-div">
      <form className="add-schedule-form">
        <div className="source-airport-div">
          <label htmlFor="source-airport">
            <b>Routes </b>
          </label>
          {/* <select
            className="select-source-airport"
            onChange={(e)=>setRouteId(e.target.value)}
          >
            <option value="0">--Select route--</option>
            {routes.map((route) => (
              <option key={route.id} value={route.id}  >
                {route.sourceAirport.city} - {route.destinationAirport.city}
              </option>
            ))}
          </select> */}
          {routes.length > 0 && (
            <select
              className="select-source-airport"
              onChange={(e) => setRouteId(e.target.value)}
            >
              <option value="0">--Select route--</option>
              {routes.map((route) => (
                <option key={route.id} value={route.id}>
                  {route.sourceAirport.city} - {route.destinationAirport.city}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flight-number-div flight-detail-div">
          <label htmlFor="flight-number">
            <b>Flight Number : </b>
          </label>
          <select
            className="select-destination-airport"
            onChange={handleFlightNumberChange}
          >
            <option value="0">--Select flight--</option>
            {flights.map((flight) => (
              <option key={flight.flightNumber} value={flight.flightNumber}>
                {flight.flightNumber}
              </option>
            ))}
          </select>
        </div>
        <div className="departure-time-div">
          <label htmlFor="departure-time">
            <b>Departure Time : </b>
          </label>
          <input
            type="datetime-local"
            value={departureTime}
            onChange={handleDepartureTimeChange}
            min={minDateTime}
          />
        </div>

        <div className="departure-time-div">
          <label htmlFor="departure-time">
            <b>Arrival Time :</b>
          </label>
          <input
            type="datetime-local"
            value={arrivalTime}
            onChange={handleArrivalTimeChange}
            min={minDateTime}
          />
        </div>
      </form>
      <button
        type="button"
        className="add-schedule-btn"
        onClick={AddNewSchedule}
      >
        Add Schedule
      </button>
    </div>
  );
}
