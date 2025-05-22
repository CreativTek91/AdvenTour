import { useEffect,useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import TripCard from "./TripCard";
import MySelect from "../../components/select/MySelect";
function Trip() {
  const { trips, fetchTrips} = useAuthStore();
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState({ price: "price", title: "title" });
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    fetchTrips(sortBy, sortDirection, currentPage, limit);
  }, [fetchTrips, sortBy, sortDirection, currentPage, limit]);

  return (
    <div className="@container mx-auto p-4 flex flex-wrap gap-2 items-center justify-center">
      <MySelect value={sortBy} setValue={setSortBy}>
        Sort by
      </MySelect>
      <MySelect value={sortDirection} setValue={setSortDirection}>
        Sort direction
      </MySelect>
      <label>
        Current page
        <input
          type="number"
          value={currentPage}
          onChange={(e) => setCurrentPage(e.target.value)}
        />
      </label>
      <button onClick={''}>Search</button>
      {trips.length > 0 && <></>
        // trips.map((trip) => <TripCard key={trip._id} trip={trip} />)
        }
    </div>
  );
}

export default Trip;
