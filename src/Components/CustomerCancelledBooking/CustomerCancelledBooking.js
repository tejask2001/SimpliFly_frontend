import React, { useEffect, useState } from "react";
import "./CustomerCancelledBooking.css";

export default function CustomerCancelledBooking() {
  var [cancelledBooking, setCancelledBooking] = useState([]);
  var userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    fetch(
      `http://localhost:13304/api/users/GetCancelledBookingByUserId?userId=${userId}`
    )
      .then((res) => res.json())
      .then((res) => {
        setCancelledBooking(res);
        console.log(res);
      });
  }, []);

  function getDate(date) {
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return { formattedDate, formattedTime };
  }

  function ChangeRefundStatus(id) {
    const token = sessionStorage.getItem("token");
    var RequestOption = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    fetch(
      `http://localhost:13304/api/Bookings/ChangeRefundStatus?id=${id}`,
      RequestOption
    )
      .then((res) => res.json())
      .then((res) => {
        alert("Refund request sent");
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Error sending request");
      });
  }

  return (
    <div className="cancelled-booking-div">
      <table className="cancel-table">
        <tbody>
          <tr>
            <th>Source</th>
            <th>Destination</th>
            <th>Departure date</th>
            <th>Passenger Name</th>
            <th>Refund Status</th>
            <th></th>
          </tr>
          {cancelledBooking.map((booking, index) => (
            <tr key={index}>
              <td>{booking.schedule.route.sourceAirport.city}</td>
              <td>{booking.schedule.route.destinationAirport.city}</td>
              <td>
                {getDate(new Date(booking.schedule.departure)).formattedDate}
              </td>
              <td>{booking.passengerName}</td>
              <td
                className={`${
                  booking.refundStatus === "pending"
                    ? "pending"
                    : booking.refundStatus === "request sent"
                    ? "request-sent"
                    : "amount-refunded"
                }`}
              >
                {booking.refundStatus}
              </td>
              <td>
                {booking.refundStatus === "pending" && (
                  <button
                    className="refund-btn"
                    onClick={() => ChangeRefundStatus(booking.id)}
                  >
                    Request refund
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
