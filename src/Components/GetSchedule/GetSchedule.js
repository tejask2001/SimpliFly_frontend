import React, { useState } from 'react'
import './GetSchedule.css'
import axios from 'axios'

export default function GetSchedule() {
    var [schedules,setSchedules]=useState([])

    function getDate(date){
      const formattedDate = date.toLocaleDateString(); 
      const formattedTime = date.toLocaleTimeString();

      return { formattedDate, formattedTime };
    }

    var Schedules = ()=>axios.get("http://localhost:5256/api/Schedule")
                .then(function(response){
                    setSchedules(response.data)
                })
                .catch(function(err){
                    console.log(err)
                })
  return (
    <div>
      <div className='schedule-div'>        
        <button onClick={Schedules}>Getdata</button>
        {schedules.map((schedule,index)=>
        <div key={index} className='schedule-list-div'>
          <div className='schedule-flight-detail'>
            <div><b>Flight Number :</b> {schedule.flightId}</div>
            <div><b>Airline :</b> {schedule.flight.airline}</div>
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
