
import "./home.css";


function HomePage() {

  return (
      <div className="font-bold text-4xl">
        <div className="flex justify-center ">
          AdvenTour
          <img src="../src/assets/images/location2.svg" alt="location" />
        </div>
      <h2>Time for your</h2>
      <h3 className="font-bold text-8xl">next AdvenTour!</h3>
      <p className="text-lg">Let us plan it for you</p>
      <button className="look">Look </button>
    </div>
  );
}

export default HomePage;
