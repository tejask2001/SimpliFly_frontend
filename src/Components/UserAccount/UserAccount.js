import React, { useState } from "react";
import Profile from "../Profile/Profile";
import "./UserAccount.css";

export default function UserAccount() {
  var [profile, setProfile] = useState(true);
  var [bookings, setBookings] = useState(false);
  var [bookingsHistory, setBookingHistory] = useState(false);
  var userRole = sessionStorage.getItem("role");

  var [isCustomer, setIsCustomer] = useState(userRole=="customer");
  var [isFlightOwner, setIsFlightOwner] = useState(userRole=="flightOwner");
  var [isAdmin, setIsAdmin] = useState(userRole=="admin");

  return (
    <div>
      <div className="container-body">
        <div className="sidebar">
          <div className="sidebar-container">
            <div
              className="sidebar-option"
              onClick={() => {
                setProfile(true);
                setBookings(false);
                setBookingHistory(false);
              }}
            >
              Profile
            </div>

            {isCustomer && <div
              className="sidebar-option"
              onClick={() => {
                setProfile(false);
                setBookings(true);
                setBookingHistory(false);
              }}
            >
              Bookings
            </div>}
            {isCustomer && <div
              className="sidebar-option"
              onClick={() => {
                setProfile(false);
                setBookings(false);
                setBookingHistory(true);
              }}
            >
              Bookings History
            </div>}
          </div>
        </div>
        <div className="container-main">
          {profile && (
            <div className="get-User">
              <Profile />
            </div>
          )}
          {bookings && <div className="get-flightOwner"></div>}
          {bookings && <div className="get-flightOwner"></div>}
        </div>
      </div>
    </div>
  );
}
