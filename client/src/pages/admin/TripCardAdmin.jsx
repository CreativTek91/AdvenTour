import { useEffect,useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import TripCardEditor from "./TripCardEditor";
import MySelect from "../../components/select/MySelect";
function TripCardAdmin() {
  const { trips, fetchTrips, deleteTrip, updateTrip } = useAuthStore();
 
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("title");
  const [limit, setLimit] = useState(10);
  const [isMultiple, setIsMultiple] = useState(false);
  
  useEffect(() => {
    fetchTrips(sortBy, sortDirection, currentPage, limit);
  }, [fetchTrips, sortBy, sortDirection, currentPage, limit]);

  return (
    <div className="@container mx-auto p-4 flex flex-wrap gap-2 items-center justify-center">
      <div className="flex flex-col sm:flex-row gap-2 items-center justify-between @md:w-full">
              <MySelect
                value={sortBy}
                setValue={setSortBy}
                options={["title", "date", "price"]}
                setIsMultiple={setIsMultiple}
                isMultiple={isMultiple}
              >
                Sort by:
              </MySelect>
              <MySelect
                value={sortDirection}
                setValue={setSortDirection}
                options={["asc", "desc"]}
                setIsMultiple={setIsMultiple}
                isMultiple={isMultiple}
              >
                Sort direction:
              </MySelect>
              <label>
                Current page:
                <input
                  type="number"
                  value={currentPage}
                  onChange={(e) => setCurrentPage(e.target.value)}
                />
              </label>
              <label>
                Limit:
                <input
                  type="number"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                />
              </label>
              <button onClick={() => {}}>Search</button>
            </div>
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


