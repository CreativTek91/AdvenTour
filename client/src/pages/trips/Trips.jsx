import useAuthStore from "../../store/useAuthStore";
import { useEffect } from "react";
function Trips() {
  const {trips,fetchTrips } = useAuthStore();
    useEffect(() => {
     fetchTrips();
    
    }, [fetchTrips]);

  return (
    <>
      <h1 className="text-2xl font-bold text-center">Trips</h1>
      <div className="flex flex-wrap justify-center items-center gap-4">
        {trips.map((trip) => (
          <div key={trip.id} className="border p-4 m-2 rounded-lg">
            <h2 className="text-xl font-semibold">{trip.title}</h2>
            <img
              src={trip.image}
              alt={trip.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p>{trip.description}</p>
            <p>Price: {trip.price} €</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Trips