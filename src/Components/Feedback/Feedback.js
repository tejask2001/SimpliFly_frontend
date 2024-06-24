import React from 'react'
import './Feedback.css'

export default function Feedback() {
  return (
    <div className='feedback'>
        <div className='ticket-booked-msg'>
            <img src='https://www.hcckuwait.com/wp-content/uploads/2021/05/Appoinment_Success.png' className='img-tick'/>
        <div className='successful-text'>Ticket booked successfully.</div>        
        </div>
        <div className='feedback-div'>
              <div class="wrapper"> 
  <div class="title">Rate your experience</div>
  <div class="content">We highly value your feedback! Kindly take a moment to rate your experience and provide us with your valuable feedback.</div>
  <div class="rate-box">
    <input type="radio" name="star" id="star0"/>
    <label class="star" for="star0"></label>
    <input type="radio" name="star" id="star1"/>
    <label class="star" for="star1"></label>
    <input type="radio" name="star" id="star2" checked="checked"/>
    <label class="star" for="star2"></label>
    <input type="radio" name="star" id="star3"/>
    <label class="star" for="star3"></label>
    <input type="radio" name="star" id="star4"/>
    <label class="star" for="star4"></label>
  </div>
  <textarea cols="30" rows="6" placeholder="Tell us about your experience!"></textarea>
  <div class="submit-btn">Send</div>
</div>
        </div>
    </div>
  )
}
