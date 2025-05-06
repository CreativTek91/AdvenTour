import { NavLink } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { PiSignInBold } from "react-icons/pi";
import { MdEditDocument } from "react-icons/md"; 
import { SiGnuprivacyguard } from "react-icons/si";
// import { useAuthContext } from "../context/useAuthContext";

const Sidebar = () => {
	//  const { authUser } = useAuthContext();
// const authUser = true; 
const authUser = false; 
	return (
		<aside
			className='flex flex-col items-center min-w-12 sm:w-16 sticky top-0 left-0 h-screen py-8
      overflow-y-auto border-r bg-glass'
		>
			<nav className='h-full flex flex-col gap-3'>
				<NavLink to='/' className='flex justify-center hover:bg-gray-800 p-1.5 '>
				Reise
				</NavLink>

				 <NavLink
					to='/'
					className='p-1.5 flex justify-center transition-colors duration-200 rounded-lg 
					hover:bg-gray-800'
				>
					<IoHomeSharp size={20} />
				</NavLink>

				{authUser && (
					<NavLink
						to='/likes'
						className='p-1.5 flex justify-center transition-colors duration-200 rounded-lg hover:bg-gray-800'
					>
						<FaHeart size={22} />
					</NavLink>
				)}

				{authUser && (
					<NavLink
						to='/explore'
						className='p-1.5 flex justify-center transition-colors duration-200 rounded-lg hover:bg-gray-800'
					>
						<MdOutlineExplore size={25} />
					</NavLink>
				)}

				{!authUser && (
					<NavLink
						to='/login'
						className='p-1.5 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-800'
					>
						<PiSignInBold size={25} />
					</NavLink>
				)}

				{authUser && (
					<NavLink
						to='/register'
						className='p-1.5 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-800'
					>
						<MdEditDocument size={25} />
					</NavLink>
				)}
	{!authUser && (
					<NavLink
						to='/register'
						className='p-1.5 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-800'
					>
                        <SiGnuprivacyguard size={25}/>
						
					</NavLink>
				)}
			</nav>
		</aside>
	);
};
export default Sidebar;