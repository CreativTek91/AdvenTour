// /AdvenTour/client/src/App.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState} from "react";
import Layout from "./components/layout/Layout";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import HomePage from "./pages/home/HomePage";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Trips from "./pages/trips/Trips";
import TripDetail from "./pages/trips/TripDetail";
import Booking from "./pages/booking/Booking";                    // 🆕
import BookingConfirmation from "./pages/booking/BookingConfirmation";  // 🆕
import Login from "./pages/login/LoginPage";
import Register from "./pages/register/Register";
import AdminPage from "./pages/admin/AdminPage";
import AddTrip from "./pages/admin/AddTrip";
import PanelAddContact from "./pages/admin/PanelAddContact";
import ImageGallery from "./components/imageGallery/ImageGallery";
import useAuthStore from "./store/useAuthStore";
import "./App.css";
import Profile from "./pages/userPage/Profile";
import Edit from "./pages/userPage/EditUserPage";
// Wenn dein Video in src/assets/... liegt:
import backgroundVideo from "./assets/images/BackgroundVideo.mp4"; // <-- Pfad ggf. anpassen
import Search from "./pages/search/Search";
import MyFavoritTrips from "./pages/userPage/MyFavoritTrips";
import MyBookings from "./pages/userPage/booking/MyBookings";
import NotFoundPage from "./pages/NotFoundPage";
import { use } from "react";

function App() {
  const {checkAuth,loading,fetchUser} = useAuthStore();
  const [bg, setBg] = useState("bg-home");
  let location = useLocation();




  // Dynamische Hintergrund-Klasse
  useEffect(() => {
    const map = {
      "/": "bg-home",
      "/about": "bg-about",
      "/contact": "bg-contact",
      "/trips": "bg-trips",
      "/login": "bg-login",
      "/register": "bg-register",
      "/search": "bg-search",
      "/trips/:tripId": "bg-trip-detail",
      "/booking/tripId": "bg-booking",
      "/booking/confirmation": "bg-booking-confirmation",
      "/profile/id": "bg-profile",
      "/favorite": "bg-favorite",
      "/edit": "bg-edit-profile",
      "/admin": "bg-admin",
      "/addTrip": "bg-add-trip",
      "/panelContact": "bg-panel-contact",
      "/media": "bg-media",
    };
    setBg(map[location.pathname] || "bg-default");
    document.title = `ADVEN TOUR | ${map[location.pathname] ? map[location.pathname].replace("bg-", "").replace("-", " ").toUpperCase() : ""}`;
  }, [location.pathname]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
       checkAuth();}
      
}, [checkAuth]);
useEffect(() => {
  fetchUser();

}, [fetchUser]);
if (loading) {
  return (
    <div className="flex justify-center items-center h-screen text-white">
      Loading...
    </div>
  );
}

  return (
    <div
      className={`flex flex-col text-white text-center mx-auto h-screen sm:w-full ${bg} transition-all duration-300`}
    >
      <Header />
     
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="search" element={<Search />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          {/* <Route path="activate-success" element={<ActivationPage />} />{" "} */}
          {/* ✅ Neu */}
          {/* Trip‑Bereich */}
          <Route path="trips" element={<Trips />} />
          <Route path="trips/:tripId" element={<TripDetail />} />
          {/* Buchungs‑Bereich */}
          <Route path="booking/:tripId" element={<Booking />} />
          <Route
            path="booking/confirmation"
            element={<BookingConfirmation />}
          />{" "}
          {/* ✅ Neu */}
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="edit" element={<Edit />} />
          <Route path="favorite" element={<MyFavoritTrips />} />
          <Route path="/bookings/my/:id" element={<MyBookings />} />
          {/* Admin-Bereich */}
          <Route path="admin" element={<AdminPage />} />
          <Route path="addTrip" element={<AddTrip />} />
          <Route path="panelContact" element={<PanelAddContact />} />
          <Route path="media" element={<ImageGallery />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;

