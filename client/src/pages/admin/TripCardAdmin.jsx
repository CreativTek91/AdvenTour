// import { useEffect } from "react";
// import useAuthStore from "../../store/useAuthStore";
// import TripCardEditor from "./TripCardEditor";

// function TripCardAdmin() {
//   const { trips, fetchTrips, deleteTrip, updateTrip } = useAuthStore();

//   useEffect(() => {
//     fetchTrips();
//   }, [fetchTrips]);

//   return (
//     <div className="@container mx-auto p-4 flex flex-wrap gap-2 items-center justify-center">
//       {trips.length > 0 &&
//         trips.map((trip) => (
//           <TripCardEditor
//             key={trip._id}
//             trip={trip}
//             updateTrip={updateTrip}
//             deleteTrip={deleteTrip}
//           />
//         ))}
//     </div>
//   );
// }

// export default TripCardAdmin;


import { useEffect, useState } from "react";
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
  const [search, setSearch] = useState("");
  const [filteredTrips, setFilteredTrips] = useState([]);

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
          Find by city:
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
          {/* <button onClick={searchByCity}>Search</button> */}
        </label>
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