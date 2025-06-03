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
import Booking from "./pages/booking/Booking";          // 🆕
import Login from "./pages/login/LoginPage";
import Register from "./pages/register/Register";
import AdminPage from "./pages/admin/AdminPage";
import AddTrip from "./pages/admin/AddTrip";
import PanelAddContact from "./pages/admin/PanelAddContact";
import ImageGallery from "./components/imageGallery/ImageGallery";



import useAuthStore from "./store/useAuthStore";
import "./App.css";

function App() {
  const { loading, fetchUser } = useAuthStore();
  const [bg, setBg] = useState("bg-home");
  const location = useLocation();

  /* Hintergrund‑Klasse */
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

  /* User laden */
  useEffect(() => { fetchUser(); }, [fetchUser]);

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
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Trip‑Bereich */}
          <Route path="trips" element={<Trips />} />
          <Route path="trips/:tripId" element={<TripDetail />} />

          {/* 🆕 Booking‑Route */}
          <Route path="booking/:tripId" element={<Booking />} />
          

          {/* Admin‑Bereich */}
          <Route path="admin" element={<AdminPage />}>
            <Route path="addTrip" element={<AddTrip />} />
          </Route>

          <Route path="panelContact" element={<PanelAddContact />} />
          <Route path="media" element={<ImageGallery />} />
        </Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
