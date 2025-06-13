
import "./about.css";
import { NavLink } from "react-router-dom";

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
            Reisen ist mehr als nur das Überwinden von Distanzen; es ist eine tiefgreifende Lebensphilosophie, die uns lehrt, flexibel zu sein und das Unbekannte zu umarmen. Jeder Aufbruch, ob in ferne Länder oder einfach nur in einen neuen Stadtteil, birgt die Chance, unsere Perspektiven zu erweitern und uns selbst neu zu entdecken. Es ist die Bereitschaft, Komfortzonen zu verlassen, die uns wirklich wachsen lässt – so wie ein Baum seine Wurzeln tiefer in die Erde gräbt, um stärker zu werden, so graben wir uns durch neue Erfahrungen tiefer in unser eigenes Sein.
          </p>
        </div>
        <div className="flex flex-col gap-2 mt-4 items-center sm:flex-row ">
          <NavLink className="btnAbout">Latest Promos</NavLink>
         
          <NavLink to="/trips" className="btnAbout">
            {" "}
            Our Offerinngs
          </NavLink>
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
