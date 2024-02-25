import React, { useState } from 'react'
import './DeleteFlight.css'

export default function DeleteFlight() {

    var [flightNumber,setFlightNumber]=useState();
    
    var DeleteFlightFun=(e)=>{
        e.preventDefault()
        console.log(flightNumber)

        const params = new URLSearchParams({
            flightNumber: flightNumber,
          });
        
        const token=sessionStorage.getItem('token')
        var RequestOption={
            method : 'DELETE',
            headers : {
              'Content-Type':'application/json',
              'Authorization':'Bearer '+token
            }
        }
        fetch(`http://localhost:5256/api/Flight?${params.toString()}`,RequestOption)
            .then(res=>res.json())
            .then(res=>{
                console.log(res);
                alert('Flight deleted successfully');
            })
            .catch(err => {
                console.error('Error:', err);
                alert('Error deleting flight.');
              });
    }
  return (
    <div className='delete-flight-div'>
      <div className='delete-flight-detail-div'>
        <label htmlFor='flight-number'><b>Flight Number : </b></label>
        <input type='text' placeholder='Enter flight number'value={flightNumber} onChange={(e)=>setFlightNumber(e.target.value)}/>
      </div>
      <button type='button' className='delete-flight-btn' onClick={DeleteFlightFun}>Delete Flight</button>
    </div>
  )
}
