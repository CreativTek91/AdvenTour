import {useState,useEffect} from 'react'
import useAuthStore  from '../../store/useAuthStore';
import TripCard from '../trips/TripCard';
import MySelect from '../../components/select/MySelect';
import Sidebar from '../../components/sideBar/SideBar';
function Search() {
    const [search, setSearch] =useState("");
     const { trips, fetchTrips,setTrips } = useAuthStore();
      const [activity, setActivity] = useState("");
      const [sortDirection, setSortDirection] = useState("asc");
      const [currentPage, setCurrentPage] = useState(1);
      const [sortBy, setSortBy] = useState("title");
      const [limit, setLimit] = useState(10);
      const [isMultiple, setIsMultiple] = useState(false);
      const [filteredTrips, setFilteredTrips] = useState([]);
        useEffect(() => {
          fetchTrips(sortBy, sortDirection, currentPage, limit);
        }, [fetchTrips, sortBy, sortDirection, currentPage, limit]);

const searchBylocation = () => {
          if (search.trim() === "") {
            fetchTrips(sortBy, sortDirection, currentPage, limit);
          } else {
            const filtered = trips.filter((trip) =>
               trip.location.split(',')[1].toLowerCase().includes(search.toLowerCase())
          
            );
            setFilteredTrips(filtered);
           
           
          }
        };
  return (
    <div className="container mx-auto p-4 ">
      {/* <div className="@container mx-auto p-4 flex flex-wrap gap-2 items-center justify-center"> */}
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
        <MySelect
          value={activity}
          setValue={setActivity}
          options={[
            "Sports",
            "Music",
            "Art",
            "Technology",
            "Food",
            "Travel",
            "Other",
          ]}
          setIsMultiple={setIsMultiple}
          isMultiple={isMultiple}
        >
          Select activity:
        </MySelect>
      </div>
      <section className="flex flex-wrap gap-4 justify-around items-start mt-4">
        <Sidebar className="flex flex-col items-center flex-grow-1 ">
          {filteredTrips.length > 0 && (
            <>
              <h2>Trips by location</h2>
              {filteredTrips.map((trip) => (
                <>
                  <h3>{trip.location}</h3>
                  <TripCard key={trip._id} trip={trip} />
                </>
              ))}
            </>
          )}
        </Sidebar>
        <div className="flex flex-wrap">
          {trips.length > 0 &&
            trips.map((trip) => <TripCard key={trip._id} trip={trip} />)}
        </div>
      </section>
    </div>
  );
}

export default Search
