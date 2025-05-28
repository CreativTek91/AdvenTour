import { NavLink } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { IoMdContact } from "react-icons/io";
import { SlLogout } from "react-icons/sl";
import { PiSignInBold } from "react-icons/pi";
import { SiGnuprivacyguard } from "react-icons/si";
import Sidebar from "../../components/sideBar/SideBar";

import useAuthStore from "../../store/useAuthStore";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  return (
    <aside className="flex w-screen flex-col ">
      <nav className="flex  flex-wrap justify-center items-center w-full md:justify-between ">
        <NavLink
          to="/"
          className="p-1.5 flex justify-center transition-colors duration-200 rounded-lg 
					hover:bg-[#fcb48b]"
        >
          <IoHomeSharp size={20} />
        </NavLink>
        <NavLink
          to="/trips"
          className="fp-1.5 flex justify-center transition-colors duration-200 rounded-lg 
					hover:bg-[#fcb48b]"
        >
          Trips
        </NavLink>
        <NavLink
          to="/contact"
          className="fp-1.5 flex justify-center transition-colors duration-200 rounded-lg 
					hover:bg-[#fcb48b]"
        >
          Contact
        </NavLink>

        {!user && (
          <NavLink
            to="/register"
            className="p-1.5 flex justify-center transition-colors duration-200 rounded-lg 
					hover:bg-[#88eef7]"
          >
            <SiGnuprivacyguard size={25} />
          </NavLink>
        )}
        {!user && (
          <NavLink
            to="/login"
            className="p-1.5 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-[#88eef7]"
          >
            <PiSignInBold size={25} />
          </NavLink>
        )}

        {(user && user.role === "admin") && (
          <>
            <NavLink
              to="/admin"
              className="p-1.5 flex justify-center transition-colors duration-200 rounded-lg
               hover:bg-[#405b6b]"
            >
              <span className="text-sm">Admin</span>
            </NavLink>
            <Sidebar />
          </>
        )}
      
        {user && (
          <ul>
            <li>Welcome {user.name}</li>
            <li>
              <button onClick={logout}>
                <SlLogout />
              </button>
            </li>
          </ul>
        )}
      </nav>
    </aside>
  );
};
export default Navbar;