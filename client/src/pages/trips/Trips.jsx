import useAuthStore from "../../store/useAuthStore";
import { useEffect } from "react";
function Trips() {
  const {trips,fetchTrips } = useAuthStore();
    useEffect(() => {
     fetchTrips();
    
    }, [fetchTrips]);
  console.log("trips", trips);
  return (
    <div>Trips</div>
  )
}

export default Trips