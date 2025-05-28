import { NavLink } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { SlLogout } from "react-icons/sl";
import { FaHeart } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { PiSignInBold } from "react-icons/pi";
import { MdEditDocument } from "react-icons/md";
import { SiGnuprivacyguard } from "react-icons/si";
import { IoMdContact } from "react-icons/io";
import "./sideBar.css";
import useAuthStore from "../../store/useAuthStore";

const Sidebar = () => {
const { user } = useAuthStore();
  const activeClassName = "bg-gray-800 text-white p-1.5 rounded-lg";
  const inactiveClassName = "p-1.5 flex justify-center transition-colors duration-200 rounded-lg hover:bg-gray-800";
  return (
    <aside className={activeClassName}>
      <nav className="flex gap-1  flex-wrap justify-center items-center w-full">
        {user && user.role === "admin" && (
          <>
            <NavLink
              to="/panelContact"
              className="p-1.5 flex justify-center transition-colors duration-200 rounded-lg 
					hover:bg-gray-800"
            >
              Contact
            </NavLink>
            <NavLink
              to="/addTrip"
              className="fp-1.5 flex justify-center transition-colors duration-200 rounded-lg 
					hover:bg-gray-800"
            >
              Add Trip
            </NavLink>
            <NavLink
              to="/search"
              className="fp-1.5 flex justify-center transition-colors duration-200 rounded-lg 
					hover:bg-gray-800"
            ></NavLink>
            <NavLink
              to="/media"
              className="fp-1.5 flex justify-center transition-colors duration-200 rounded-lg 
					hover:bg-gray-800"
            >
              Gallery
            </NavLink>
          </>
        )}
        {user && user.role === "user" && (
          <>
            <NavLink
              to="/about"
              className="p-1.5 flex justify-center transition-colors duration-200 rounded-lg 
                    hover:bg-[#88eef7]"
            >
              <MdOutlineExplore size={25} />
            </NavLink>

            <NavLink
              to="/profile/:userId"
              className="p-1.5 flex justify-center transition-colors duration-200 rounded-lg 
                                hover:bg-[#88eef7]"
            >
              <IoMdContact size={25} />
            </NavLink>
            <NavLink
              to="/edit"
              className="pp-1.5 flex justify-center transition-colors duration-200 rounded-lg 
                    hover:bg-[#88eef7]"
            >
              <MdEditDocument size={25} />
            </NavLink>

            <NavLink
              to="/likes"
              className="p-1.5 flex justify-center transition-colors duration-200 rounded-lg hover:bg-gray-800"
            >
              <FaHeart size={22} />
            </NavLink>
          </>
        )}
      </nav>
    </aside>
  );
};
export default Sidebar;


// {
//   "title": "Trip nach Hamburg",
//   "location": "Hamburg",
//   "date": "2025-06-10",
//   "duration": 3,
//   "description": "Erkunde den Hafen und die Speicherstadt.",
//   "price": 199,
//   "image": "https://res.cloudinary.com/mycloud123/image/upload/v1710000000/adventour_trips/hamburg.jpg"
// }