import { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import TripCardEditor from "./TripCardEditor";
import MySelect from "../../components/select/MySelect";
import TripCard from "../trips/TripCard";
import Sidebar from "../../components/sideBar/SideBar";
import PannelAddContact from "./PanelAddContact";
function TripCardAdmin() {
  const { trips, fetchTrips, deleteTrip, updateTrip } = useAuthStore();
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("title");
  const [limit, setLimit] = useState(10);
  const [isMultiple, setIsMultiple] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredTrips, setFilteredTrips] = useState([]);
  useEffect(() => {
    fetchTrips(sortBy, sortDirection, currentPage, limit);
  }, [fetchTrips, sortBy, sortDirection, currentPage, limit]);


  const searchBylocation = () => {
    if (search.trim() === "") {
      fetchTrips(sortBy, sortDirection, currentPage, limit);
    } else {
      const filtered = trips.filter((trip) => {
        const splitLocation = trip.location?.split(",") || [];
        const locationPart = splitLocation[1]?.trim().toLowerCase();
        return locationPart && locationPart.includes(search.toLowerCase());
      });
      setFilteredTrips(filtered);
    }
  };
  return (
    <div className="@container mx-auto p-4 flex flex-wrap gap-2 items-center justify-center">
      <div className="flex flex-col sm:flex-row gap-2 items-center justify-between @md:w-full">
      <Sidebar path={['/panelContact']} icons={["📞 ✉️ 📧"]} />
       
   
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
            className="w-15 p-1"
            type="number"
            value={currentPage}
            onChange={(e) => setCurrentPage(e.target.value)}
          />
        </label>
        <label>
          Limit:
          <input
            className="w-15 p-1"
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          />
        </label>
        <label htmlFor="search">
          Find by location:
          <input
            type="text"
            id="search"
            value={search}
            className="w-40 p-1 border border-gray-300 rounded-md"
            placeholder="Search trips..."
            onChange={(e) => {
              setSearch(() => e.target.value);
            }}
          />
          <button onClick={searchBylocation}>Search</button>
        </label>
      </div>
      {search && (
        <Sidebar>
          {filteredTrips.length > 0 && (
            <>
              {filteredTrips.map((trip) => (
                <div key={trip._id} className="mb-4">
                  <h3>{trip.location.split(",")[1]}</h3>
                  <TripCard key={trip._id} trip={trip} />
                </div>
              ))}
            </>
          )}
        </Sidebar>
      )}
    
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