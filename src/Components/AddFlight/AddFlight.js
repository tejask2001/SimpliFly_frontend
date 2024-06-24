import React, { useState } from 'react'
import './AddFlight.css'
import { json } from 'react-router-dom';

export default function AddFlight() {
  var [flightNumber,setFlightNumber]=useState();
  var [airline,setAirline]=useState();
  var [totalEconomySeats,setTotalEconomySeats]=useState();
  var [totalPremiumEconomySeats,setTotalPremiumEconomySeats]=useState();
  var [totalBusinessClassSeats,setTotalBusinessClassSeats]=useState();
  var [economySeatPrice,setEconomySeatPrice]=useState();
  var [premiumEconomySeatPrice,setPremiumEconomySeatPrice]=useState();
  var [businessClassSeatPrice,setBusinessClassSeatPrice]=useState();


  var flightDetails={}
  var AddFlight =(e)=>{
    if(!flightNumber || !airline){
      alert("Enter all required fields");
      return
    }
    e.preventDefault();
    flightDetails.flightNumber="";
    flightDetails.airline=airline;
    flightDetails.totalEconomySeats=parseInt(totalEconomySeats);
    flightDetails.totalPremiumEconomySeats=parseInt(totalPremiumEconomySeats);
    flightDetails.totalBusinessClassSeats=parseInt(totalBusinessClassSeats);
    flightDetails.economySeatPrice=parseInt(economySeatPrice);
    flightDetails.businessClassSeatPrice=parseInt(businessClassSeatPrice);
    flightDetails.premiumEconomySeatPrice=parseInt(premiumEconomySeatPrice);

    flightDetails.flightOwnerOwnerId=parseInt(sessionStorage.getItem('ownerId'))
    console.log(flightDetails)

    const token=sessionStorage.getItem('token')
    
    var RequestOption={
      method : 'POST',
      headers : {
        'Content-type':'application/json',
        'Authorization':'Bearer '+token
      },
      body : JSON.stringify(flightDetails)
    }
    fetch("http://localhost:13304/api/Flight/AddFlight",RequestOption)
    .then(res => res.json())
    .then(res => {
      console.log('Response:', res);
      alert('Flight added successfully');
    })
    .catch(err => {
      console.error('Error:', err);
      alert('Flight Already Exists');
    });
  }

  return (
    <div className='add-flight-div'>
      <form className='add-flight-form'>
                <div className='flight-airline-div flight-detail-div'>
                  <label htmlFor='flight-airline'><b>Airline : </b></label>
                  <input type='text' placeholder='Enter airline' value={airline} onChange={(e)=>setAirline(e.target.value)} required/>
                </div>
                <div className='total-seats-div flight-detail-div'>
                  <label htmlFor='total-seats'><b>Total Economy Seats : </b></label>
                  <input type='number' placeholder='Enter total seats' value={totalEconomySeats} onChange={(e)=>setTotalEconomySeats(e.target.value)} required/>
                </div><div className='total-seats-div flight-detail-div'>
                  <label htmlFor='total-seats'><b>Total Premium Economy Seats : </b></label>
                  <input type='number' placeholder='Enter total seats' value={totalPremiumEconomySeats} onChange={(e)=>setTotalPremiumEconomySeats(e.target.value)} required/>
                </div>
                <div className='total-seats-div flight-detail-div'>
                  <label htmlFor='total-seats'><b>Total Business class Seats : </b></label>
                  <input type='number' placeholder='Enter total seats' value={totalBusinessClassSeats} onChange={(e)=>setTotalBusinessClassSeats(e.target.value)} required/>
                </div>
                <div className='base-price-div flight-detail-div'>
                  <label htmlFor='base-price'><b>Economy Price : </b></label>
                  <input type='number' placeholder='Enter base price' value={economySeatPrice} onChange={(e)=>setEconomySeatPrice(e.target.value)} required/>
                </div>
                <div className='base-price-div flight-detail-div'>
                  <label htmlFor='base-price'><b>Premium Economy Price : </b></label>
                  <input type='number' placeholder='Enter base price' value={premiumEconomySeatPrice} onChange={(e)=>setPremiumEconomySeatPrice(e.target.value)} required/>
                </div>
                <div className='base-price-div flight-detail-div'>
                  <label htmlFor='base-price'><b>Business Class Price : </b></label>
                  <input type='number' placeholder='Enter base price' value={businessClassSeatPrice} onChange={(e)=>setBusinessClassSeatPrice(e.target.value)} required/>
                </div>
                  <button type='button' className='add-flight-btn' onClick={AddFlight}>Add Flight</button>
        </form>
    </div>
  )
}
