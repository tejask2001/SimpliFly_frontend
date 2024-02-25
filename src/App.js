import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import HomeComponent from "./Components/Home/HomeComponent";
import AboutPage from "./Components/AboutPage/AboutPage";
import Login from "./Components/Login/Login";
import Error from "./Components/Error/Error";
import RegisterFlightOwner from "./Components/RegisterFlightOwner/RegisterFlightOwner";
import FlightOwnerHome from "./Components/FlightOwnerHome/FlightOwnerHome";
import ManageFlight from "./Components/ManageFlight/ManageFlight";
import ManageRoute from "./Components/ManageRoute/ManageRoute";
import ManageSchedule from "./Components/ManageSchedule/ManageSchedule";
import NavMenu from "./Components/Navbar/NavMenu";
import SearchedFlightResult from "./Components/SearchedFlightResult/SearchedFlightResult";
import PrivateRoute from '../src/Components/PrivateRoute/PrivateRoute'
import BookingDetails from "./Components/BookingDetails/BookingDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/">
          <Route index element={<HomeComponent />} />
          <Route path="home" element={<HomeComponent />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<RegisterFlightOwner />} />
          <Route path="navMenu" element={<NavMenu />} />
          <Route path="searchFlightResult" element={<SearchedFlightResult />} />
          <Route path="bookingDetails" element={<BookingDetails />} />
          <Route path="*" element={<Error />} />
        </Route>
        <Route path="/flightOwner/" element={<PrivateRoute />}>
            <Route path="login" element={<Login />} />
            <Route path="home" element={<FlightOwnerHome />} />
            <Route path="manageFlight" element={<ManageFlight />} />
            <Route path="manageRoute" element={<ManageRoute />} />
            <Route path="manageSchedule" element={<ManageSchedule />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const HomeContainer = () => {
  return (
    <div style={{ height: "100vh", overflowY: "auto" }}>
      <HomeComponent />
    </div>
  );
};

export default App;
