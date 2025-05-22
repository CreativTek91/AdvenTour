// /AdvenTour/client/src/pages/trips/Trips.jsx
import { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import TripCard from "./TripCard";
import "./trips.css";

function Trip() {
  const { trips, fetchTrips } = useAuthStore();
  const [currentPage, setCurrentPage] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const tripsPerPage = 3;

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const startIndex = currentPage * tripsPerPage;
  const visibleTrips = showAll
    ? trips
    : trips.slice(startIndex, startIndex + tripsPerPage);

  const hasNext = startIndex + tripsPerPage < trips.length;
  const hasPrev = currentPage > 0;

  const handleNext = () => {
    if (hasNext) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (hasPrev) setCurrentPage(currentPage - 1);
  };

  const handleShowAll = () => {
    setShowAll(true);
  };

  return (
    <div className="trip-wrapper">
      <div className="trip-grid">
        {visibleTrips.map((trip) => (
          <TripCard key={trip._id} trip={trip} />
        ))}
      </div>

      {!showAll && (
        <div className="pagination-controls">
          <button
            onClick={handlePrev}
            disabled={!hasPrev}
            className={`nav-btn ${!hasPrev ? "disabled" : ""}`}
          >
            &laquo; Zurück
          </button>
          <button
            onClick={handleNext}
            disabled={!hasNext}
            className={`nav-btn ${!hasNext ? "disabled" : ""}`}
          >
            Nächste &raquo;
          </button>
          <button onClick={handleShowAll} className="nav-btn show-all">
            Alle
          </button>
        </div>
      )}
    </div>
  );
}

export default Trip;
