import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import HomeComponent from './Components/Home/HomeComponent'
import AboutPage from './Components/AboutPage/AboutPage';
import Login from './Components/Login/Login';
import Error from './Components/Error/Error'
import RegisterFlightOwner from './Components/RegisterFlightOwner/RegisterFlightOwner'
import FlightOwnerHome from './Components/FlightOwnerHome/FlightOwnerHome';

function App() {
  

  return (
    <BrowserRouter>
  <Navbar /> {/* Render Navbar outside the Routes */}
  <Routes>
    <Route path='/'>
      <Route index element={<HomeComponent />} />
      <Route path='home' element={<HomeComponent />} />
      <Route path='about' element={<AboutPage />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<RegisterFlightOwner />} />
      <Route path='*' element={<Error />} />
    </Route>
    <Route path='/flightOwner/'>
      <Route path='home' element={<FlightOwnerHome />} />
    </Route>
  </Routes>
</BrowserRouter>



  );
}

const HomeContainer = () => {
  return (
    <div style={{ height: '100vh', overflowY: 'auto' }}>
      <HomeComponent />
    </div>
  );
};

export default App;
