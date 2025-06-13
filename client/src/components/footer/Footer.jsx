import { useLocation } from "react-router-dom";
function Footer() {
  let location = useLocation();
  console.log("Current Location:", location.pathname);
  return (
    <div className=" bg-gray-800 text-white flex justify-between items-center p-4 w-full">
      <a href="/">Adventour</a>
      <a href="www.freepik.com" className="www.freepik.com">
        Designed by Freepik
      </a>
    </div>
  );
}

export default Footer;
