import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import TripDetail from "./pages/trips/TripDetail";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Login from "./pages/login/LoginPage";
import Register from "./pages/register/Register";
import Trips from "./pages/trips/Trips";
import AddTrip from "./pages/trips/AddTrip";
import { useEffect, useState } from "react";
import useAuthStore from "./store/useAuthStore";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import AdminPage from "./pages/admin/AdminPage";
import { useLocation } from "react-router-dom";
import ImageGallery from "./components/imageGallery/ImageGallery";
import PanelAddContact from "./pages/admin/PanelAddContact"
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";

function App() {
  const { user, loading, fetchUser } = useAuthStore();
  const [bg, setBg] = useState("bg-home");
  let location = useLocation();
  const getBG = () => {
    switch (location.pathname) {
      case "/":
        return "bg-home";
      case "/about":
        return "bg-about";
      case "/contact":
        return "bg-contact";
      case "/trips":
        return "bg-trips";
      case "/login":
        return "bg-login";
      case "/register":
        return "bg-register";
      default:
        return "bg-default";
    }
  };

  useEffect(() => {
    setBg(() => getBG());
  }, [location.pathname]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div
      className={`flex flex-col text-white text-center mx-auto  h-screen sm:w-full ${bg} transition-all duration-300`}
    >
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/trips/:tripId" element={<TripDetail />} />
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

// flex flex-col   text-white mx-auto transition-all duration-300

//  <div
//         className="flex flex-col text-white text-center
//         justify-between
//         items-between md:relative sm:flex-row sm:justify-between sm:items-center"
//       ></div>
