import React, { useState } from 'react'
import './GetSchedule.css'
import axios from 'axios'

export default function GetSchedule() {
    var [schedules,setSchedules]=useState([])

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
            <div><b>ScheduleId :</b> {schedule.id}</div>
            <div><b>Flight Number :</b> {schedule.flightId}</div>
            <div><b>Airline :</b> {schedule.flight.airline}</div>
            <div><b>Source Airport :</b> {schedule.route.sourceAirport.name}, {schedule.route.sourceAirport.city}</div>
            <div><b>Destination Airport :</b> {schedule.route.destinationAirport.name}, {schedule.route.destinationAirport.city}</div>
        </div>
        )}
    </div>
    </div>
  )
}
