
import { MdEditDocument } from "react-icons/md";
import useAuthStore from "../../store/useAuthStore";

import Sidebar from "../../components/sideBar/SideBar";
import { FaHeart } from "react-icons/fa";
import "./profile.css";

const links = ["/favorite", "/edit", "/bookings/my"];
const icons = [
  <FaHeart size={20} />,
  <MdEditDocument size={20} />,
  "My Bookings",
];
function Profile() {
  const { user} = useAuthStore();
  return (
    <section className="flex flex-col justify-ceenter items-center  max-w-[fit] h-full gap-4 p-4 bg-glass shadow-md rounded-lg relative">
      <Sidebar
        path={links}
        icons={icons}
        className="flex flex-col items-center"
      ></Sidebar>
      {user?.avatar && (
        <img
          src={user.avatar.url}
          alt="avatar"
          className="w-[6rem] h-[6rem] rounded-full"
        />
      )}
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Joined: {user?.createdAt.split("T")[0]}</p>
    </section>
  );
}
export default Profile;
