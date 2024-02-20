import React from "react";
import "./HomeComponent.css";
import plane from "../../Assets/Images/plane.png";
import PopularDestination from "../PopularDestination/PopularDestination";
import { useState } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

export default function HomeComponent() {
  const [isRoundtrip, setIsRoundtrip] = useState(false);
    
  var[dateOfJourney,setDateOfJourney]= useState(new Date());
  var[Origin,setOrigin]=useState();
  var[Destination,setDestination]=useState();
  var searchFlightDetails={}
  var searchFlight = (e) => {
    e.preventDefault();
    searchFlightDetails.dateOfJourney = dateOfJourney;
    searchFlightDetails.Origin = Origin;
    searchFlightDetails.Destination = Destination;
  
    var requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }

    const params = new URLSearchParams({
      dateOfJourney: searchFlightDetails.dateOfJourney,
      Origin: searchFlightDetails.Origin,
      Destination: searchFlightDetails.Destination,
    });

    fetch(`http://localhost:5256/api/Flight/SearchFlight?${params.toString()}`, requestOptions)
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
  

    const handleFlightTypeChange = (e) => {
      setIsRoundtrip(e.target.id === 'roundtrip');
    };

  return (
    <div>
      <div className="home-main">
        <img
          src="https://preview.redd.it/v303fhu204681.jpg?auto=webp&s=49d7184fe29ac0bb0f5e6e14c5b41814e4e237e3"
          className="background-img"
        />
        <div className="home-left">
          <a className="navbar-brand" href="#">
            <img
              src={plane}
              alt="SimplyFly Logo"
              height="90"
              className="logo-simplifly"
            />
          </a>
          <div className="booking-cta">
            <h1 className="msg">Book your flight today</h1>
            <p className="more-msg">Get your tickets at the lowest price !!!</p>
          </div>
        </div>
        <div className="flight-search-container">
          <div className="booking-form-container">
            <form>
              <div className="form-options">
                <label htmlFor="one-way" className="one-way">
                  <input type="radio" id="one-way" name="flight-type" checked={!isRoundtrip}
                onChange={handleFlightTypeChange} />
                  <span></span>One way
                </label>
                <label htmlFor="roundtrip" className="roundtrip">
                  <input type="radio" id="roundtrip" name="flight-type" checked={isRoundtrip}
                onChange={handleFlightTypeChange} />
                  <span></span>Roundtrip
                </label>
              </div>
              <div className="source-destination-div">
                <div className="departure-div">
                  <label htmlFor="departure">Flying from</label>
                  <input
                    className="form-control"
                    type="text"
                    value={Origin}
                    onChange={(e)=>setOrigin(e.target.value)}
                    placeholder="City or airport"
                    id="departure"
                  />
                </div>
                <div className="arrival-div">
                  <label htmlFor="arrival">Flying to</label>
                  <input
                    className="form-control"
                    type="text"
                    value={Destination}
                    onChange={(e)=>setDestination(e.target.value)}
                    placeholder="City or airport"
                    id="arrival"
                  />
                </div>
              </div>
              <div className="date-div">
                <span className="departing-txt">Departure</span>
                <input className="form-control date-select" type="date" value={dateOfJourney} 
                onChange={(e)=>setDateOfJourney(e.target.value)} required />
              </div>
              {isRoundtrip && (
        <div className="return-date-div">
          <span className="departing-txt">Return </span>
          <input className="form-control date-select" type="date" required />
        </div>
      )}
              <div className="passenger-count-div">
                <div className='adult-div'>
                <span className="adult-passenger">Adult (18+)</span>
                  <input type="number" id="adultpassengerCount" name="passengerCount"  min="1" max="5"/>
                </div>
                <div className='child-div'>
                <span className="child-passenger">Child(0-17)</span>
                  <input type="number" id="childpassengerCount" name="passengerCount" min="0" max="5"/>
                </div>
              </div>
              <div className="form-btn">
                <button className="submit-btn show-flight-btn" type="submit" onClick={searchFlight}>
                  Show flights
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <PopularDestination/>
      <Footer/>
    </div>
  );
}
