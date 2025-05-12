import { NavLink } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { PiSignInBold } from "react-icons/pi";
import { MdEditDocument } from "react-icons/md"; 
import { SiGnuprivacyguard } from "react-icons/si";
import { IoMdContact } from "react-icons/io";
import './sideBar.css';
import useAuthStore from "../../store/useAuthStore";

const Sidebar = () => {
	 const { authUser } = useAuthStore();
console.log(authUser);
	return (
    <aside className="flex justify-center p-2 mb-4 items-center min-w-screen sm:w-16 sticky  border-r bg-glass flex-basis-1/4 sm:min-w-4 sm:h-screen
    sm:flex-col sm:justify-start sm:items-center sm:pt-4
    ">
      <nav className="flex gap-1  flex-wrap justify-center items-center w-full">
        <NavLink
          to="/"
          className="fp-1.5 flex justify-center transition-colors duration-200 rounded-lg 
					hover:bg-gray-800"
        >
          Reise
        </NavLink>

        <NavLink
          to="/"
          className="p-1.5 flex justify-center transition-colors duration-200 rounded-lg 
					hover:bg-gray-800"
        >
          <IoHomeSharp size={20} />
        </NavLink>

        {authUser && (
          <NavLink
            to="/likes"
            className="p-1.5 flex justify-center transition-colors duration-200 rounded-lg hover:bg-gray-800"
          >
            <FaHeart size={22} />
          </NavLink>
        )}

        {authUser && (
          <NavLink
            to="/explore"
            className="p-1.5 flex justify-center transition-colors duration-200 rounded-lg 
					hover:bg-gray-800"
          >
            <MdOutlineExplore size={25} />
          </NavLink>
        )}

        {!authUser && (
          <NavLink
            to="/login"
            className="p-1.5 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-800"
          >
            <PiSignInBold size={25} />
          </NavLink>
        )}

        {authUser && (
          <NavLink
            to="/register"
            className="pp-1.5 flex justify-center transition-colors duration-200 rounded-lg 
					hover:bg-gray-800"
          >
            <MdEditDocument size={25} />
          </NavLink>
        )}
        {!authUser && (
          <NavLink
            to="/register"
            className="p-1.5 flex justify-center transition-colors duration-200 rounded-lg 
					hover:bg-gray-800"
          >
            <SiGnuprivacyguard size={25} />
          </NavLink>
        )}
        <NavLink
          to="/trips/addTrip"
          className="p-1.5 flex justify-center transition-colors duration-200 rounded-lg 
					hover:bg-gray-800"
        >
          Add
        </NavLink>
        <NavLink
          to="/contact"
          className="p-1.5 flex justify-center transition-colors duration-200 rounded-lg 
					hover:bg-gray-800"
        >
          <IoMdContact size={25} />
        </NavLink>
      </nav>
    </aside>
  );
};
export default Sidebar;