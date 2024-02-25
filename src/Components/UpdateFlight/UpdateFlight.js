import React, { useState } from "react";
import "./UpdateFlight.css";

export default function UpdateFlight() {
  const [updateAirline,setUpdateAirline]=useState(true)
  const [updateSeats,setUpdateSeats]=useState(false)

  var [flightNumber,setFlightNumber]=useState()
  var [airline,setAirline]=useState()
  var [seats,setSeats]=useState()

  var updateAirlineDetail={}
  var updateSeatsDetail={}

    var UpdateFlightAirline=(e)=>{
        e.preventDefault();
        updateAirlineDetail.flightNumber=flightNumber;
        updateAirlineDetail.airline=airline;
        console.log(updateAirlineDetail)

        const token=sessionStorage.getItem('token')
        var RequestOption={
            method : 'PUT',
            headers : {
                'Content-Type':'application/json',
                'Authorization':'Bearer '+token
            },
            body : JSON.stringify(updateAirlineDetail)
        }

        fetch("http://localhost:5256/api/Flight",RequestOption)
            .then(res=>res.json())
            .then(res=>{
                console.log(res);
                alert('Flight airline update successfully');
            })
            .catch(err => {
                console.error('Error:', err);
                alert('Error updating flight.');
              });
    }

    var UpdateFlightSeats=(e)=>{
        e.preventDefault();
        updateSeatsDetail.flightNumber=flightNumber;
        updateSeatsDetail.totalSeats=parseInt(seats);
        console.log(updateSeatsDetail)

        var RequestOption={
            method : 'PUT',
            headers : {'Content-Type':'application/json'},
            body : JSON.stringify(updateSeatsDetail)
        }

        fetch("http://localhost:5256/api/Flight/UpdateTotalSeats",RequestOption)
            .then(res=>res.json())
            .then(res=>{
                console.log(res);
                alert('Flight seats update successfully');
            })
            .catch(err => {
                console.error('Error:', err);
                alert('Error updating flight.');
              });
    }
  return (
      <div className="update-flight-div">
        <div className="update-options-div">
          <div className="update-airline-btn" onClick={()=>{
            setUpdateAirline(true);
            setUpdateSeats(false);
          }}>Update Airline</div>
          <div className="update-seats-btn" onClick={()=>{
            setUpdateAirline(false);
            setUpdateSeats(true);
          }}>Update Seats</div>
          
        </div>
        <div className="update-div">
          {updateAirline && <div className="update-airline">
                <form>
                    <div className="flightnumber-input-div">
                        <label htmlFor="flight-number" ><b>Flight Number :</b> </label>
                        <input type="text" placeholder="Enter Flight Number" value={flightNumber} onChange={(e)=>setFlightNumber(e.target.value)}/>
                    </div>
                    <div className="airline-input-div">
                        <label htmlFor="airline"><b>Airline :</b> </label>
                        <input type="text" placeholder="Enter Airline" value={airline} onChange={(e)=>setAirline(e.target.value)}/>
                    </div>
                    <button type='button' className='update-flight-btn' onClick={UpdateFlightAirline}>Update Flight</button>
                </form>
            </div>}
            {updateSeats && <div className="update-seats">
                <form>
                    <div className="flightnumber-input-div">
                        <label htmlFor="flight-number"><b>Flight Number :</b> </label>
                        <input type="text" placeholder="Enter Flight Number" value={flightNumber} onChange={(e)=>setFlightNumber(e.target.value)}/>
                    </div>
                    <div className="seats-input-div">
                        <label htmlFor="seats"><b>Seats :</b> </label>
                        <input type="number" placeholder="Enter Seats" value={seats} onChange={(e)=>setSeats(e.target.value)}/>
                    </div>
                    <button type='button' className='update-flight-btn' onClick={UpdateFlightSeats}>Update Flight</button>
                </form>
            </div>}
          </div>
      </div>
  );
}
