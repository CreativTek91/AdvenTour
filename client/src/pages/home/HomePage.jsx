import { useEffect, useState } from "react";
import "./home.css";
import { videoSet } from "../../helpers/videoSet";
function HomePage() {
  const [set, setSet] = useState(videoSet);
  useEffect(() => {}, [set]);

  return (
    <div className="flex flex-col text-center items-center  justify-center mx-auto bg-glass h-screen md:w-1/2 md:h-1/2 ">
      <h1 className="text-sm font-bold text-center px-1 sm:text-2xl sm:mt-2">
        Welcome to AdvenTour
      </h1>
      <p className="text-sm mb-5 text-center sm:text-lg sm:font-bold">
        Your adventure starts here!
      </p>
      <video
        autoPlay
        controls
        loop
        muted
        className="video rounded-lg w-3/4 h-1/2"
      >
        <source src={set[2]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <br />
      <button
        className="bg-[#52dbc9] hover:bg-gray-600 text-white text-left font-500 rounded  xs:p-4 mt-4 text-sm 
      text-center sm:mb-6"
      >
        Get Started
      </button>
    </div>
  );
}

export default HomePage;
