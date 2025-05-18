import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <main className="flex flex-col grow-1   p-0 overflow-auto scroll-smooth">
      <Outlet />
      
    </main>
  );
};

export default Layout;
