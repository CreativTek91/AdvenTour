import TripCard from "./TripCard";
import useAuthStore from "../../store/useAuthStore";
import { useEffect } from "react";

function Trips() {
  const { trips, fetchTrips, loading } = useAuthStore();
  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);
  if (loading) {
    return <div className="text-white">Loading...</div>;
  }
  return (
    <div className="container mx-auto p-4 flex flex-col gap-4 items-center justify-center "> 
      <h1 className="text-sm text-center lg:text-4xl">our offer</h1>
      <div className="flex flex-col sm:flex-wrap sm:flex-row gap-4 w-[80%] xs:w-[60%] md:w-[70%] lg:w-[80%] xl:w-[60%] 2xl:w-[50%]">
        {trips.length > 0 &&
          trips.map((trip) => {
            return <TripCard key={trip._id} trip={trip} />;
          })}
      </div>
    </div>
  );
}

export default Trips;
