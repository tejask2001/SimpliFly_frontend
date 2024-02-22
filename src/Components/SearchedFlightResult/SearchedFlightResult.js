import React, { useState } from "react";
import "./SearchedFlightResult.css";

export default function SearchedFlightResult() {
  const [isRoundtrip, setIsRoundtrip] = useState(false);

  const handleFlightTypeChange = (e) => {
    setIsRoundtrip(e.target.id === "roundtrip");
  };
  return (
    <div className="searched-flight-result-page">
      <div className="search-flight-details-div">

        <div class="radio-btn grid">
          <div className="radio-btn-div">
            <label htmlFor="one-way">
              <input
                type="radio"
                id="one-way"
                name="flight-type"
                checked={!isRoundtrip}
                onChange={handleFlightTypeChange}
              />
              <span></span>One way
            </label>
            <label htmlFor="roundtrip" >
              <input
                type="radio"
                id="roundtrip"
                name="flight-type"
                checked={isRoundtrip}
                onChange={handleFlightTypeChange}
              />
              <span></span>Roundtrip
            </label>
          </div>
        </div>

        <div class="grid">
            
        </div>
        <div class="grid">Grid 3</div>
        <div class="grid">Grid 3</div>
        {isRoundtrip && <div class="grid">Grid 4</div>}
        <div class="grid">Grid 5</div>
      </div>
    </div>
  );
}
