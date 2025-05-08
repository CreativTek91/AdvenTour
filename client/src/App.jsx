import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Login from "./pages/login/LoginPage";
import Register from "./pages/register/Register";
import Trips from "./pages/trips/Trips";
import Sidebar from "./components/sideBar/SideBar";
import { AddTrip } from "./pages/trips/AddTrip";
import { useEffect } from "react";
import useAuthStore from "./store/useAuthStore";
import "./App.css";

function App() {
  const {loading,fetchUser } = useAuthStore();
  useEffect(() => {
    fetchUser();
  }
  , [fetchUser]);
  if (loading) {
    return <div className="text-white">Loading...</div>;
  }
const user=true
//const user =false
;
  return (
    <div className={user ? "neutral" : "flow"}>
      <div className="flex text-white">
        <Sidebar />
        <div className="max-w-5xl  my-5 text-white mx-auto transition-all duration-300 flex-1">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/trips" element={<Trips />} />
              <Route path="/trips/addTrip" element={<AddTrip />} />
            </Route>
          </Routes>
          {/* <footer>Footer</footer> */}
        </div>
      </div>
    </div>
  );
}

export default App;
