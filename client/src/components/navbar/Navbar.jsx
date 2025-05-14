
import { NavLink } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { SlLogout } from "react-icons/sl";
import { FaHeart } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { PiSignInBold } from "react-icons/pi";
import { MdEditDocument } from "react-icons/md";
import { SiGnuprivacyguard } from "react-icons/si";
import { IoMdContact } from "react-icons/io";

import useAuthStore from "../../store/useAuthStore";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  return (
    <aside className="flex ">
      <nav className="flex gap-1  flex-wrap justify-center items-center w-full">
        <NavLink
          to="/"
          className="p-1.5 flex justify-center transition-colors duration-200 rounded-lg 
					hover:bg-gray-800"
        >
          <IoHomeSharp size={20} />
        </NavLink>
        <NavLink
          to="/trips"
          className="fp-1.5 flex justify-center transition-colors duration-200 rounded-lg 
					hover:bg-gray-800"
        >
          Trips
        </NavLink>
        
        {/* {user && (
          <NavLink
            to="/likes"
            className="p-1.5 flex justify-center transition-colors duration-200 rounded-lg hover:bg-gray-800"
          >
            <FaHeart size={22} />
          </NavLink>
        )} */}

        {/* {user && (
          <NavLink
            to="/explore"
            className="p-1.5 flex justify-center transition-colors duration-200 rounded-lg 
					hover:bg-gray-800"
          >
            <MdOutlineExplore size={25} />
          </NavLink>
        )} */}

        {!user && (
          <NavLink
            to="/login"
            className="p-1.5 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-800"
          >
            <PiSignInBold size={25} />
          </NavLink>
        )}
        {user && (
          <button onClick={logout}>
            <SlLogout />
          </button>
        )}
        {user && (
          <NavLink
            to="/profile"
            className="pp-1.5 flex justify-center transition-colors duration-200 rounded-lg 
					hover:bg-gray-800"
          >
            <MdEditDocument size={25} />
          </NavLink>
        )}
        {!user && (
          <NavLink
            to="/register"
            className="p-1.5 flex justify-center transition-colors duration-200 rounded-lg 
					hover:bg-gray-800"
          >
            <SiGnuprivacyguard size={25} />
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
          to="/contact"
          className="p-1.5 flex justify-center transition-colors duration-200 rounded-lg 
					hover:bg-gray-800"
        >
          <IoMdContact size={25} />
        </NavLink>
        {user && user.role === "admin" && (
          <NavLink
            to="/admin"
            className="p-1.5 flex justify-center transition-colors duration-200 rounded-lg
          hover:bg-gray-800"
          >
            {user.name}
          </NavLink>
        )}
      </nav>
    </aside>
  );
};
export default Navbar;