import React, { useState } from 'react'
import './AddSchedule.css'

export default function AddSchedule() {
    const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  const minDateTime = currentDate.toISOString().slice(0, 16);

    var [sourceAirport, setSourceAirport] = useState();
  var [destinationAirport, setDestinationAirport] = useState();
  var [flightNumber,setFlightNumber]=useState();
  var [departureTime,setDepartureTime]=useState();
  var [arrivalTime,setArrivalTime]=useState();
  var [routeId,setRouteId]=useState();
  var [airports, setAirports] = useState([]);
  var addScheduleDetails={}


  var AddNewSchedule=(e)=>{
    e.preventDefault();
addScheduleDetails.flightId=flightNumber;
departureTime = new Date(departureTime).toISOString();
addScheduleDetails.departure=departureTime;
arrivalTime=new Date(arrivalTime).toISOString();
addScheduleDetails.arrival=arrivalTime;
console.log(addScheduleDetails);

var requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  const params = new URLSearchParams({
    SourceAirportId: parseInt(sourceAirport),
    DestinationAirportId: parseInt(destinationAirport),
  });
  fetch(`http://localhost:5256/api/Route/GetRouteId?${params.toString()}`, requestOptions)
      .then(res => res.json())
      .then((res) => {
        addScheduleDetails.routeId=res
        console.log(addScheduleDetails);
    })
      .catch(err => console.log(err));

      var RequestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body : JSON.stringify(addScheduleDetails)
      }
      fetch("http://localhost:5256/api/Schedule",RequestOptions)
    .then(res => res.json())
    .then(res => {
      console.log('Response:', res);
      alert('Schedule added successfully');
    })
    .catch(err => {
      console.error('Error:', err);
      alert('Error adding schedule.');
    });

  }

  useState(() => {
    fetch("http://localhost:5256/api/Route/GetAirports")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setAirports(res);
      });
  });

  return (
      <div className="add-schedule-div">
      <form className="add-schedule-form">
        <div className="source-airport-div">
          <label htmlFor="source-airport">
            <b>Source Airport : </b>
          </label>
          <select
            className="select-source-airport"
            onChange={(e) => setSourceAirport(e.target.value)}
          >
            <option value="0">--Select airport--</option>
            {airports.map((airport) => (
              <option key={airport.id} value={airport.id}>
                {airport.city}
              </option>
            ))}
          </select>
        </div>

        <div className="destination-airport-div">
          <label htmlFor="destination-airport">
            <b>Destination Airport : </b>
          </label>
          <select
            className="select-destination-airport"
            onChange={(e) => setDestinationAirport(e.target.value)}
          >
            <option value="0">--Select airport--</option>
            {airports.map((airport) => (
              <option key={airport.id} value={airport.id}>
                {airport.city}
              </option>
            ))}
          </select>
        </div>
        <div className='flight-number-div flight-detail-div'>
                  <label htmlFor='flight-number'><b>Flight Number : </b></label>
                  <input type='text' placeholder='Enter flight number' value={flightNumber} onChange={(e)=>setFlightNumber(e.target.value)}/>
                </div>
                <div className='departure-time-div'>
                    <label htmlFor='departure-time'><b>Departure Time : </b></label>
                <input type='datetime-local' value={departureTime} onChange={(e)=>setDepartureTime(e.target.value)}
                min={minDateTime}/>
                </div>
           
            <div className='departure-time-div'>
            <label htmlFor='departure-time'><b>Arrival Time :</b></label>
                <input type='datetime-local' value={arrivalTime} onChange={(e)=>setArrivalTime(e.target.value)}
                min={minDateTime}/>
                </div>
      </form>
      <button type="button" className="add-schedule-btn" onClick={AddNewSchedule}>
        Add Schedule
      </button>
    </div>
  )
}
