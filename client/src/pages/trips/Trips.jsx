import { useEffect } from "react";
import useAuthStore from "../../store/useAuthStore";
import TripCard from "./TripCard";

function Trip() {
  const { trips, fetchTrips} = useAuthStore();

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  return (
    <div className="@container mx-auto p-4 flex flex-wrap gap-2 items-center justify-center">
      {trips.length > 0 &&
        trips.map((trip) => (
          <TripCard
            key={trip._id}
            trip={trip}
          />
        ))}
    </div>
  );
}

export default Trip;
