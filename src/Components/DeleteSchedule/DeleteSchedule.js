import React, { useState } from 'react'
import './DeleteSchedule.css'

export default function DeleteSchedule() {

    const currentDateTime = new Date().toISOString()
    var [airlineScheduleDelete,setAirlineScheduleDelete]=useState(true)
    var [dateScheduleDelete,setDateScheduleDelete]=useState(false)

    var [flightNumber,setFlightNumber]=useState();
  var [airport,setAirport]=useState();
  var [date,setDate]=useState();

  var [airports, setAirports] = useState([]);

  var DeleteFligtSchedule=(e)=>{

  }
  var DeleteDateSchedule=(e)=>{

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
    <div className="delete-schedule-options-div">
        <div className="delete-options-div">
          <div className="delete-flightschedule-btn" onClick={()=>{
            setAirlineScheduleDelete(true);
            setDateScheduleDelete(false);
          }}>Delete Flight Schedule</div>
          <div className="delete-dateschedule-btn" onClick={()=>{
            setAirlineScheduleDelete(false);
            setDateScheduleDelete(true);
          }}>Delete Schedule by Date</div>
          
        </div>
        <div className="delete-schedule-div">
          {airlineScheduleDelete && <div className="delete-flight-schedule">
                <form>
                    <div className="flightnumber-input-div">
                        <label htmlFor="flight-number" ><b>Flight Number :</b> </label>
                        <input type="text" placeholder="Enter Flight Number" value={flightNumber} onChange={(e)=>setFlightNumber(e.target.value)}/>
                    </div>
                    <button type='button' className='delete-schedule-btn' onClick={DeleteFligtSchedule}>Delete Schedule</button>
                </form>
            </div>}
            {dateScheduleDelete && <div className="delete-date-schedule">
                <form>
                <div className='date-div'>
                    <label htmlFor='departure-time'><b>Departure Time : </b></label>
                <input type='date' value={date} onChange={(e)=>setDate(e.target.value)}
                min={currentDateTime}/>
                </div>

                <div className="destination-airport-div">
          <label htmlFor="destination-airport">
            <b>Destination Airport : </b>
          </label>
          <select
            className="select-destination-airport"
            onChange={(e) => setAirport(e.target.value)}
          >
            <option value="0">--Select airport--</option>
            {airports.map((airport) => (
              <option key={airport.id} value={airport.id}>
                {airport.city}
              </option>
            ))}
          </select>
        </div>
                    <button type='button' className='delete-date-schedule-btn' onClick={DeleteDateSchedule}>Delete Schedule</button>
                </form>
            </div>}
          </div>
      </div>
  )
}
