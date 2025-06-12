import { NavLink } from "react-router-dom";

import "./sideBar.css";


const Sidebar = ({children,path='',icons=[]}) => {
 
  const active ="border text-white  rounded-sm flex justify-between flex-col flex-wrap transition-colors duration-200 hover:bg-gray-800  ";
  
  return (
    <aside >
      <section className="flex justify-center items-center gap-6 p-4  shadow-md rounded-lg  bg-glass">
        {path && path.length > 0
          ? path.map((p, index) => {
              return (
                icons &&
                icons.length > 0 &&
                icons[index] && (
                  <NavLink
                    key={index}
                    to={p}
                    className={({ isActive }) =>
                      isActive
                        ? active
                        : "p-1.5 flex justify-center transition-colors duration-200 rounded-lg hover:bg-gray-800"
                    }
                  >
                    {icons[index]}
                  </NavLink>
                )
              );
            })
          : ""}
        {children}
      </section>
    </aside>
  );
};
export default Sidebar;

