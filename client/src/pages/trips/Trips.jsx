import TripCard from "../../components/TripCard";
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
        {
        trips.length > 0 && trips.map((trip)=>
          {return(
            <TripCard key={trip._id} trip={trip} />
          )}
        )
        }
      </div>
    </>
  )
}

export default Trips