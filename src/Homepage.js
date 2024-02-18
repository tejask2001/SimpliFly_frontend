import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import HomeComponent from './Components/Home/HomeComponent'
import GetFlight from './Components/GetFlight/GetFlight'
import GetRoute from './Components/GetRoute/GetRoute'
import Footer from './Components/Footer/Footer'
import Login from './Components/Login/Login'
import RegisterFlightOwner from './Components/RegisterFlightOwner/RegisterFlightOwner'

export default function Homepage() {
  return (
    <div>
      <RegisterFlightOwner/>
    </div>
  )
}
