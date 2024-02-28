import React, { useState } from "react";
import "./SearchedFlightResult.css";
import { useDispatch, useSelector } from "react-redux";
import { addSearchFlight } from "../../SearchFlightSlice";
import {addSelectedFlight} from '../../SelectedFlightSlice'
import indigo from "../../Assets/Images/indigo.png";
import airIndia from "../../Assets/Images/airindia.png";
import vistara from "../../Assets/Images/vistara.png";
import { useNavigate } from "react-router-dom";
import { addSearchFlightResult} from '../../SearchFlightResultSlice'
import Footer from "../Footer/Footer";

export default function SearchedFlightResult() {
  const [isRoundtrip, setIsRoundtrip] = useState(false);
  var getSearchDetails=useSelector((state)=>state.searchFlight)
  var getSearchFlightResult=useSelector((state)=>state.searchFlightResult)
  const currentDateTime = new Date().toISOString().split('T')[0];
  var dispatch=useDispatch()
  var navigate=useNavigate()
  
  var[dateOfJourney,setDateOfJourney]= useState(getSearchDetails.dateOfJourney);
  var[Origin,setOrigin]=useState(getSearchDetails.Origin);
  var[Destination,setDestination]=useState(getSearchDetails.Destination);
  var[Adult,setAdult]=useState(getSearchDetails.adult || 1);
  var[Child,setChild]=useState(getSearchDetails.child || 0);
  var[SeatClass,setSeatClass]=useState('economy')

  var searchFlightDetails={}

  var SearchFlight = (e) => {
    e.preventDefault();
    searchFlightDetails.dateOfJourney = dateOfJourney;
    searchFlightDetails.Origin = Origin;
    searchFlightDetails.Destination = Destination;
    searchFlightDetails.Adult=parseInt(Adult);
    searchFlightDetails.Child=parseInt(Child);
    searchFlightDetails.SeatClass=SeatClass;

    dispatch(addSearchFlight({
      dateOfJourney:dateOfJourney,
      Origin:Origin,
      Destination:Destination,
      Adult:Adult,
      Child:Child,
      SeatClass:SeatClass
      }
    ))

    var requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }

    const params = new URLSearchParams({
      dateOfJourney: searchFlightDetails.dateOfJourney,
      Origin: searchFlightDetails.Origin,
      Destination: searchFlightDetails.Destination,
      Adult:searchFlightDetails.Adult,
      Child:searchFlightDetails.Child,
      SeatClass:searchFlightDetails.SeatClass
    });

    fetch(`http://localhost:5256/api/Flight/SearchFlight?${params.toString()}`, requestOptions)
      .then(res => res.json())
      .then(res => {
          console.log(res);
          dispatch(addSearchFlightResult({ searchFlightResult: res }));

        })
      .catch(err => console.log(err));
      
      navigate('/searchFlightResult')
}  

  function AddBooking(flight){
    dispatch(addSelectedFlight({
      flightNumber:flight.flightNumber,
      sourceAirport:flight.sourceAirport,
      destinationAirport:flight.destinationAirport,
      departureTime:flight.departureTime,
      arrivalTime:flight.arrivalTime,
      totalPrice:flight.totalPrice,
      scheduleId:flight.scheduleId,
      airline:flight.airline
    }))

    navigate('/bookingDetails')
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

  const handleFlightTypeChange = (e) => {
    setIsRoundtrip(e.target.id === "roundtrip");
  };

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
    <div className="searched-flight-result-page">
      <div className="search-flight-details-div">

        <div className="radio-btn grid">
          <div className="radio-btn-div">
            <label htmlFor="one-way">
              <input
                type="radio"
                id="one-way"
                name="flight-type"
                checked={!isRoundtrip}
                onChange={handleFlightTypeChange}
              />
              <span></span>One way
            </label>
            <label htmlFor="roundtrip" >
              <input
                type="radio"
                id="roundtrip"
                name="flight-type"
                checked={isRoundtrip}
                onChange={handleFlightTypeChange}
              />
              <span></span>Roundtrip
            </label>
          </div>
        </div>

        <div className="grid">
          <label><b>Source :</b></label>
          <input
            type="text"
            className="input-bar"
            value={Origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
        </div>
        <div className="grid">
          <label><b>Destination :</b></label>
          <input
            type="text"
            className="input-bar"
            value={Destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        <div className="grid">
          <label><b>Departure :</b></label>
          <input
            type="date"
            className="input-bar"
            value={dateOfJourney}
            onChange={(e) => setDateOfJourney(e.target.value)}
            required min={currentDateTime}
          />
        </div>
        {isRoundtrip && <div class="grid">Grid 4</div>}
        <div className="passenger-count-div grid">
          <div className="adult-select-div">
          <label htmlFor="adult-select"><b>Adult : </b></label>
          <select id="adult-select" value={Adult} onChange={(e)=>setAdult(parseInt(e.target.value))}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
          </div>
          <div className="child-select-div">
          <label htmlFor="adult-select"><b>Child : </b></label>
          <select id="child-select" value={Child} onChange={(e) => setChild(parseInt(e.target.value))}>
          <option value='0'>0</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
          </div>
        </div>
        <div className="grid">
        <select className="seatClass" value={(e)=>setSeatClass(e.target.value)}>
                  <option value='economy'>Economy</option>
                  <option value='premiumEconomy'>Premium Economy</option>
                  <option value='businessClass'>Business Class</option>
                </select>
        </div>
        <div className="grid">
        <button type="button" className="search-flight-btn" onClick={SearchFlight}>
        Search
      </button>
        </div>
      </div>
      
      <div className="available-flights-div">
        {getSearchFlightResult.map((flight, index) => (
          <div key={index} className="key-div">
            <div className="available-flight-detail">
            <img
                src={getAirlineImage(flight.airline)}
                className="airline-logo"
              />
              <div>
            <p className="flight-details">{flight.airline}</p>
            <p className="flight-details">{flight.flightNumber}</p>
            </div>
            </div>
            <div className="flight-source">
            <p className="flight-details">{flight.sourceAirport}</p>
            <p className="flight-details">{getDate(new Date(flight.departureTime)).formattedTime}</p>
            </div >
            <p className="time-diff">{getTimeDifference(flight.departureTime,flight.arrivalTime)}</p>
            <div className="flight-destination">
            <p className="flight-details">{flight.destinationAirport}</p>
            <p className="flight-details">{getDate(new Date(flight.arrivalTime)).formattedTime}</p>
            </div>
            <p className="flight-price">&#8377; {flight.totalPrice}</p>
            <button className="book-btn" onClick={() => AddBooking(flight)}>Book</button>

          </div>
        ))}
      </div>
    </div>
  );
}