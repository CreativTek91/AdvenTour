import React from "react";
import "./about.css";
function About() {
  return (
    <div className="flex flex-col w-full text-wap items-center justify-center  text-xs text-left sm:flex-row p-10 h-screen">
      <section className="basis-[50%] sm:mr-10 sm:text-xl flex flex-col gap-4 ">
        <div className="flex flex-col gap-4">
          <img
            src="../src/assets/images/location2.svg"
            alt="location"
            className="w-10 sm:w-10 "
          />
          <h2 className="text-wrap  text-lg md:font-bold md:text-8xl bg-[url(../src/assets/images/alpaka_harz.jpeg)] bg-clip-text text-transparent ">
            {" "}
            Travel made easy
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            ipsum distinctio pariatur optio dolorem veritatis, laborum aut,
            facilis debitis labore, unde fugit animi nisi! Doloremque
            praesentium quas veritatis nobis id labore odit unde soluta? Nulla
            veritatis ab officia alias, delectus tempore, laudantium esse quo
            mollitia iusto ad? Libero, ducimus ipsum.
          </p>
        </div>
        <div className="flex flex-col gap-2 mt-4 items-center sm:flex-row ">
          <button className="btnAbout">Latest Promos</button>
          <button className="btnAbout">Our Offerinngs</button>
        </div>
      </section>
      <section className="basis-[40%]">
        <div className=" w-full border-2 border-gray-300 rounded-lg shadow-md flex justify-center items-center">
          <img
            src="../src/assets/images/alpaka_harz.jpeg"
            alt="about"
            className="about_img"
          />
        </div>{" "}
      </section>
    </div>
  );
}

export default About;
