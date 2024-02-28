import React, { useState } from "react";
import "./BookingDetails.css";
import { useDispatch, useSelector } from "react-redux";
import indigo from "../../Assets/Images/indigo.png";
import airIndia from "../../Assets/Images/airindia.png";
import vistara from "../../Assets/Images/vistara.png";
import { useNavigate } from "react-router-dom";
import {addPassenger} from '../../PassengerSlice'
import Footer from "../Footer/Footer";

export default function BookingDetails() {
  var selectedFlight = useSelector((state) => state.selectedFlight);
  var passengerIds= useSelector((state)=>state.passengerIds)
  var [name, setName] = useState();
  var [age, setAge] = useState();
  var [passpostNumber, setPassportNumber] = useState();
  var navigate = useNavigate();
  var dispatch= useDispatch();
  var token=sessionStorage.getItem('token')

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

  const [passengers, setPassengers] = useState([]);

  function AddPassenger() {
    var passenger = {
      name: name,
      age: parseInt(age),
      passportNumber: passpostNumber,
    };

    setPassengers([...passengers, passenger]);
  }
  function removePassenger(index) {
    const updatedPassengers = [...passengers];
    updatedPassengers.splice(index, 1);
    setPassengers(updatedPassengers);
  }

  function AddPassengers() {}
var passengerIds=[]

function BookSeats() {
  const fetchPromises = passengers.map((passenger) => {
    var requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(passenger),
    };

    return fetch("http://localhost:5256/api/Passenger", requestOptions)
      .then((res) => res.json())
      .then((res) => {
        console.log("Response:", res);
        return res.passengerId;
      })
      .catch((err) => {
        alert("Error adding passenger.");
       
      });
  });

  Promise.all(fetchPromises)
    .then((passengerIds) => {
      dispatch(addPassenger({
        passengerIds: passengerIds
      }));
      console.log(passengerIds);
      navigate('/seatBooking')
    })
    .catch((error) => {
      console.error("Error occured", error);
    });
}

  return (
    <div className="booking-details-page">
      <div className="available-flights-div">
        <div className="selected-flight-detail">
          <img src={getAirlineImage(selectedFlight.airline)} className="airline-logo" />
          <div>
            <p className="selected-flight-details">{selectedFlight.airline}</p>
            <p className="fselected-light-details">
              {selectedFlight.flightNumber}
            </p>
          </div>
        </div>
        <div className="selected-flight-source">
          <p className="flight-details">{selectedFlight.sourceAirport}</p>
          <p className="flight-details">
            {getDate(new Date(selectedFlight.departureTime)).formattedTime}
          </p>
        </div>
        <p className="time-diff">
          {getTimeDifference(
            selectedFlight.departureTime,
            selectedFlight.arrivalTime
          )}
        </p>
        <div className="selected-flight-destination">
          <p className="flight-details">{selectedFlight.destinationAirport}</p>
          <p className="flight-details">
            {getDate(new Date(selectedFlight.arrivalTime)).formattedTime}
          </p>
        </div>
        <p className="flight-price">&#8377; {selectedFlight.totalPrice}</p>
      </div>
      <div class="passenger-form">
        <div className="passenger-list">
          <h4>Passengers</h4>
          <div id="passengerList"></div>
          <div className="mb-3 border p-3">
            <h5>Passenger</h5>
            <label htmlFor="passengerName${index}" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="passengerName${index}"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label for="passengerAge${index}" className="form-label">
              Age
            </label>
            <input
              type="number"
              className="form-control"
              id="passengerAge${index}"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />

            <label for="passengerAge${index}" className="form-label">
              Passport Number
            </label>
            <input
              type="text"
              className="form-control"
              id="passport${index}"
              value={passpostNumber}
              onChange={(e) => setPassportNumber(e.target.value)}
              required
            />
          </div>
          <button
            type="button"
            className="btn btn-danger btn-remove"
            onClick={AddPassenger}
            id="removePassengerBtn"
          >
            Add Passenger
          </button>
        </div>
      </div>
      <h1>Passenger List</h1>
      <ul className="added-passenger">
        {passengers.map((passenger, index) => (
          <li key={index} className="added-passenger-list">
            <p><strong>Name:</strong> {passenger.name}</p>
            <p><strong>Age:</strong>{" "}{passenger.age}</p> 
            <p><strong>Passport Number:</strong>{" "}
            {passenger.passportNumber}</p>
            <button
              className="remove-passenger-btn"
              onClick={() => removePassenger(index)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <br />
      <button onClick={BookSeats} className="book-seats-btn">
        Book Seats
      </button>
      <Footer/>
      </div>
  );
}
