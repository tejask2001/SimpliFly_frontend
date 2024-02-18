import axios from 'axios'
import React, { useState } from 'react'
import './GetRoute.css'

export default function GetRoute() {

    var [routes,setRoutes]=useState([])

    var RouteData = () => axios.get("http://localhost:5256/api/Route")
                    .then(function(response){
                        setRoutes(response.data)
                    })
                    .catch(function (error) {
                        console.log(error);
                      });

  return (
    <div className='route-div'>
        <button onClick={RouteData}>Getdata</button>
        {routes.map((route,index)=>
        <div key={index} className='route-list-div'>
            <div>RouteId : {route.id}</div>
            <div>Source Airport : {route.sourceAirport.name}</div>
            <div>Destination Airport : {route.destinationAirport.name}</div>
        </div>
        )}
    </div>
  )
}
