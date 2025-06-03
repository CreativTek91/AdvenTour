// /AdvenTour/client/src/App.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

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
import HomePage from "./pages/home/HomePage";
import AdminPage from "./pages/admin/AdminPage";
import { useLocation } from "react-router-dom";
import ImageGallery from "./components/imageGallery/ImageGallery";
import PanelAddContact from "./pages/admin/PanelAddContact";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Profile from "./pages/userPage/Profile";

// Wenn dein Video in src/assets/... liegt:
import backgroundVideo from "./assets/images/BackgroundVideo.mp4"; // <-- Pfad ggf. anpassen
import Search from "./pages/search/Search";

function App() {
  const {user, fetchUser,loading } = useAuthStore();
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
    };
    setBg(map[location.pathname] || "bg-default");
  }, [location.pathname]);

  useEffect(() => {

    fetchUser();
  }, [fetchUser]);

  if (loading) return <div className="text-white">Loading...</div>;

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

          {/* Trip‑Bereich */}
          <Route path="trips" element={<Trips />} />
          <Route path="trips/:tripId" element={<TripDetail />} />

          {/* Buchungs‑Bereich */}
          <Route path="booking/:tripId" element={<Booking />} />
          <Route path="booking/confirmation" element={<BookingConfirmation />} /> {/* ✅ Neu */}

          {/* Admin‑Bereich */}
          <Route path="admin" element={<AdminPage />}>
            <Route path="addTrip" element={<AddTrip />} />
          </Route>

          <Route path="/register" element={<Register />} />

          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/trips/:tripId" element={<TripDetail />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="addTrip" element={<AddTrip />} />
          <Route path="panelContact" element={<PanelAddContact />} />
          <Route path="media" element={<ImageGallery />} />
        </Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
