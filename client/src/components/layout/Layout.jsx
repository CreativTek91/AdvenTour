import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Sidebar from "../sideBar/SideBar";
const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen mx-auto min-w-screen justify-between ">
      <Header />
      <main className="">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
