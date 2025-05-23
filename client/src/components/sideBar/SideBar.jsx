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

  return (
    <aside className="flex   bg-glass text-white w-1/2 text-sm   p-4">
      <nav className="flex gap-1  flex-wrap justify-center items-center w-full">
        <NavLink
          to="/panelContact"
          className="p-1.5 flex justify-center transition-colors duration-200 rounded-lg 
					hover:bg-gray-800"
        >
          Add Contact
        </NavLink>
        {/* <NavLink
          to="/trips"
          className="fp-1.5 flex justify-center transition-colors duration-200 rounded-lg 
					hover:bg-gray-800"
        >
          Trips
        </NavLink> */}
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