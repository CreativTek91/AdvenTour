import { NavLink } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { SlLogout } from "react-icons/sl";
import { FaHeart } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { PiSignInBold } from "react-icons/pi";
import { MdEditDocument } from "react-icons/md";
import { SiGnuprivacyguard } from "react-icons/si";
import { IoMdContact } from "react-icons/io";
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
        {user && (
          <NavLink
            to="/about"
            className="p-1.5 flex justify-center transition-colors duration-200 rounded-lg 
					hover:bg-[#88eef7]"
          >
            <MdOutlineExplore size={25} />
          </NavLink>
        )}
        {user && (
          <NavLink
            to="/likes"
            className="p-1.5 flex justify-center transition-colors duration-200 rounded-lg hover:bg-[#88eef7]"
          >
            <FaHeart size={22} />
          </NavLink>
        )}

        {user && (
          <NavLink
            to="/edit"
            className="pp-1.5 flex justify-center transition-colors duration-200 rounded-lg 
					hover:bg-[#88eef7]"
          >
            <MdEditDocument size={25} />
          </NavLink>
        )}

        {/* <NavLink
          to="/admin/addTrip"
          className="p-1.5 flex justify-center transition-colors duration-200 rounded-lg 
					hover:bg-gray-800"
        >
          Add
        </NavLink> */}
        <NavLink
          to="/profile"
          className="p-1.5 flex justify-center transition-colors duration-200 rounded-lg 
					hover:bg-[#88eef7]"
        >
          <IoMdContact size={25} />
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

        {user && user.role === "admin" && (
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