import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Login from "./pages/login/LoginPage";
import Register from "./pages/register/Register";
import Trips from "./pages/trips/Trips";
import Sidebar from "./components/sideBar/SideBar";
import AddTrip from "./pages/trips/AddTrip";
import { useEffect } from "react";
import useAuthStore from "./store/useAuthStore";
import "./App.css";
import HomePage from "./pages/home/HomePage";

function App() {
  const { user, loading, fetchUser } = useAuthStore();
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  if (loading) {
    return <div className="text-white">Loading...</div>;
  }
  console.log(user);
  const user2 = true;
  //const user =false

  return (
    <div className={user2 ? "flow" : "neutral"}>
      <div className="flex flex-col text-white text-center  items-between max-h-screen  md:relative sm:flex-row ">
        <Sidebar />
        <div className="flex flex-col  text-white mx-auto transition-all duration-300 sm:justify-center sm:items-center ">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
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
