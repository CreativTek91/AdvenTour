import './navbar.css'
import { NavLink } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { SlLogout } from "react-icons/sl";
import { MdOutlineExplore } from "react-icons/md";
import { PiSignInBold } from "react-icons/pi";
import { SiGnuprivacyguard } from "react-icons/si";
import { IoMdContact } from "react-icons/io";
import useAuthStore from "../../store/useAuthStore";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuthStore();

  return (
    <aside className="flex w-screen flex-col ">
      <nav className="flex  flex-wrap justify-center items-center w-full md:justify-between ">
        <NavLink
          to="/"
          className="p-1.5 flex justify-center transition-colors duration-200 rounded-lg 
					hover:bg-[#fcb48b] "
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

        <>
          <NavLink
            to="/about"
            className="p-1.5 flex justify-center transition-colors duration-200 rounded-lg 
					hover:bg-[#88eef7]"
          >
            <MdOutlineExplore size={25} />
          </NavLink>
          <NavLink
            to="/search"
            className="fp-1.5 flex justify-center transition-colors duration-200 rounded-lg 
       hover:bg-gray-800"
          >
            Search
          </NavLink>
        </>

        {(isAuthenticated  && user?.role !=='admin') && (
          <NavLink
            to="/profile/id"
            className="p-1.5 flex justify-center transition-colors duration-200 rounded-lg 
					hover:bg-[#88eef7]"
          >
            <IoMdContact size={25} />
          </NavLink>
        )}
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

        {isAuthenticated && user?.role === "admin" && (
          <>
            <NavLink
              to="/admin"
              className="p-1.5 flex justify-center transition-colors duration-200 rounded-lg
          hover:bg-[#405b6b]"
            >
              <span className="text-sm">Admin</span>
            </NavLink>
            {/* <Sidebar /> */}
          </>
        )}
        {user && (
          <ul>
            <li>Welcome {user.name}</li>
            <NavLink to="/">
              <button onClick={logout}>
                <SlLogout />
              </button>
            </NavLink>
          </ul>
        )}
      </nav>
    </aside>
  );
};
export default Navbar;
