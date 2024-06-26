import React, { useEffect, useState } from 'react'
import './GetSchedule.css'
import axios from 'axios'
import indigo from "../../Assets/Images/indigo.png";
import airIndia from "../../Assets/Images/airindia.png";
import vistara from "../../Assets/Images/vistara.png";

export default function GetSchedule() {
    var [schedules,setSchedules]=useState([])

    function getDate(date){
      const formattedDate = date.toLocaleDateString(); 
      const formattedTime = date.toLocaleTimeString();

      return { formattedDate, formattedTime };
    }

    useEffect(()=>{
      const token=sessionStorage.getItem('token')
      const httpHeader={
        headers:{'Authorization':'Bearer '+token}
    }
        axios.get("http://localhost:13304/api/Schedule",httpHeader)
                  .then(function(response){

                    const sortBookings = response.data.sort(
                      (a, b) => new Date(b.departure) - new Date(a.departure)
                    );
                      setSchedules(response.data)
                      console.log(response.data)
                  })
                  .catch(function(err){
                      console.log(err)
                  })
    },[])

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
      <div className='schedule-div'>        
        {schedules.map((schedule,index)=>
        <div key={index} className='schedule-list-div'>
          <div className='schedule-flight-detail'>
            <div><b>Flight Number :</b> {schedule.flightId}</div>
            <div><b>Airline :</b> {schedule.flight.airline}
            <img
                src={getAirlineImage(schedule.flight.airline)}
                className="airline-logo"
              />
            </div>
          </div>
          <div className='schedule-route-detail'>
          <div className='schedule-source-detail'>
            <div><b>Source Airport :</b> {schedule.route.sourceAirport.city}</div>
            <div><b>Departure :</b> {getDate(new Date(schedule.departure)).formattedDate} {getDate(new Date(schedule.departure)).formattedTime}</div>
            </div>
            <div className='schedule-destination-detail'>
            <div><b>Destination Airport :</b>{schedule.route.destinationAirport.city}</div>
            <div><b>Arrival :</b> {getDate(new Date(schedule.arrival)).formattedDate} {getDate(new Date(schedule.arrival)).formattedTime}</div>
            </div>
            </div>
        </div>
        )}
    </div>
    </div>
  )
}
