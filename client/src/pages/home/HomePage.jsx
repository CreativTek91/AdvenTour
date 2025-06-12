
import "./home.css";


function HomePage() {

  return (
      <div className="font-bold text-sm md:text-xl lg:text-4xl block sm:p-6 justify-between items-center text-center flex flex-col">
        <div className="flex flex-col sm:flex-row  justify-center">
          AdvenTour
          <img src="../src/assets/images/location2.svg" alt="location" className="w-20"/>
        </div>
      <h2>Time for your</h2>
      <h3 className="font-bold  text-md lg:text-8xl">next AdvenTour!</h3>
      <p className="p-4 sm:text-lg">Let us plan it for you</p>
      <button className="look">Look</button>
    </div>
  );
}

export default HomePage;
