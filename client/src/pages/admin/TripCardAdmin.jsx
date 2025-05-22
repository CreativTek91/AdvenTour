import { useEffect } from "react";
import useAuthStore from "../../store/useAuthStore";
import TripCardEditor from "./TripCardEditor";

function TripCardAdmin() {
  const { trips, fetchTrips, deleteTrip, updateTrip } = useAuthStore();

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  return (
    <div className="@container mx-auto p-4 flex flex-wrap gap-2 items-center justify-center">
      {trips.length > 0 &&
        trips.map((trip) => (
          <TripCardEditor
            key={trip._id}
            trip={trip}
            updateTrip={updateTrip}
            deleteTrip={deleteTrip}
          />
        ))}
    </div>
  );
}

export default TripCardAdmin;


