import React from 'react'
import './RegisteredSuccessfully.css'
import greenTick from '../../Assets/Images/green-tick.png'

export default function RegisteredSuccessfully() {
  return (
    <div className='registration-body-div'>
      <div className='registration-msg-div'>
        <img src={greenTick} className='green-tick'/>
        <h3>Account Created Successflly</h3>
      </div>
    </div>
  )
}
