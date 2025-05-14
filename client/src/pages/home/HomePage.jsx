import { useEffect, useState } from "react";
import "./home.css";
import { videoSet } from "../../helpers/videoSet";

function HomePage() {
  const [set, setSet] = useState(videoSet);
  useEffect(() => {}, [set]);

  return (
    <div >Home</div>
    // <div className="flex flex-col text-center items-center  justify-center mx-auto bg-glass p-4 md:w-[70%] lg:w-[60%] sm:w-[90%]">
    //   <div className="flex  items-center justify-center mx-auto lg:py-0 bg-glass my-10  min-w-8">
    //     <div className="video-container">
    //       <h1 className="text-sm font-bold text-center px-1 sm:text-2xl sm:mt-2">
    //         Welcome to AdvenTour
    //       </h1>
    //       <p className="text-sm mb-5 text-center sm:text-lg sm:font-bold">
    //         Your adventure starts here!
    //       </p>
    //       <video autoPlay controls muted className=" w-screen">
    //         <source src={set[0]} type="video/mp4" />
    //         Your browser does not support the video tag.
    //       </video>
    //     </div>
    //     {/* <div className="video-container">
    //       <video
    //         autoPlay
    //         controls
    //         loop
    //         muted
    //         className=""
    //       >
    //         <source src={set[1]} type="video/mp4" />
    //         Your browser does not support the video tag.
    //       </video>
    //     </div>
    //     <div className="video-container">
    //       <video
    //         autoPlay
    //         controls
    //         loop
    //         muted
    //         className=""
    //       >
    //         <source src={set[2]} type="video/mp4" />
    //         Your browser does not support the video tag.
    //       </video>
    //     </div>
    //     <div className="video-container">
    //       <video
    //         autoPlay
    //         controls
    //         loop
    //         muted
    //         className=""
    //       >
    //         <source src={set[3]} type="video/mp4" />
    //         Your browser does not support the video tag.
    //       </video>
    //     </div>
    //     <div className="video-container">
    //       <video
    //         autoPlay
    //         controls
    //         loop
    //         muted
    //         className=""
    //       >
    //         <source src={set[4]} type="video/mp4" />
    //         Your browser does not support the video tag.
    //       </video>
    //     </div>
    //     <div className="video-container">
    //       <video
    //         autoPlay
    //         controls
    //         loop
    //         muted
    //         className=""
    //       >
    //         <source src={set[5]} type="video/mp4" />
    //         Your browser does not support the video tag.
    //       </video>
    //     </div>*/}
    //     <br />
    //   </div>
    //   <button
    //     className="bg-[#52dbc9] hover:bg-gray-600 text-white text-left font-500 rounded  xs:p-4 mt-4 text-sm 
    //   text-center sm:mb-6"
    //   >
    //     Buchen
    //   </button>
    // </div>
  );
}

export default HomePage;
