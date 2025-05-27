import { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import TripCard from "./TripCard";
import "./trips.css";
import { useNavigate } from "react-router-dom";

function Trip() {
  const { trips, fetchTrips } = useAuthStore();
  const [currentPage, setCurrentPage] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState("featured");
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [transitionPhase, setTransitionPhase] = useState("");
  const [slideDirection, setSlideDirection] = useState("");
  const navigate = useNavigate();

  const tripsPerPage = 3;

  useEffect(() => {
    fetchTrips();
    const params = new URLSearchParams(window.location.search);
    if (params.get("showAll") === "true") {
      setShowAll(true);
      setFilter("all");
    }
  }, [fetchTrips]);

  const startIndex = currentPage * tripsPerPage;
  const visibleTrips = showAll
    ? trips
    : trips.slice(startIndex, startIndex + tripsPerPage);

  const hasNext = startIndex + tripsPerPage < trips.length;
  const hasPrev = currentPage > 0;

  const handlePageChange = (direction) => {
    setTransitionPhase("fade-out");
    setTimeout(() => {
      setSlideDirection(direction === "next" ? "slide-in" : "slide-in-reverse");
      setCurrentPage((prev) => prev + (direction === "next" ? 1 : -1));
      setTransitionPhase("");
      setTimeout(() => {
        setSlideDirection("");
      }, 300);
    }, 200);
  };

  const handleNext = () => {
    if (hasNext) handlePageChange("next");
  };

  const handlePrev = () => {
    if (hasPrev) handlePageChange("prev");
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    const shouldShowAll = value === "all";
    setShowAll(shouldShowAll);
    setCurrentPage(0);

    const params = new URLSearchParams(window.location.search);
    if (shouldShowAll) {
      params.set("showAll", "true");
    } else {
      params.delete("showAll");
    }
    window.history.replaceState({}, "", `${window.location.pathname}?${params}`);
  };

  const goToBookingPage = (tripId) => {
    navigate(`/trips/${tripId}`);
  };

  return (
    <div className="trip-wrapper">
      <div className="filter-bar">
        <label htmlFor="tripFilter">Trips anzeigen:</label>
        <select id="tripFilter" value={filter} onChange={handleFilterChange}>
          <option value="featured">Empfohlen</option>
          <option value="all">Alle</option>
        </select>
      </div>

      <div className={`trip-grid ${transitionPhase} ${slideDirection}`}>
        {visibleTrips.map((trip) => (
          <div
            key={trip._id}
            className="trip-card"
            onClick={() => setSelectedTrip(trip)}
          >
            <TripCard trip={trip} />
          </div>
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
        </div>
      )}

      {selectedTrip && (
        <div className="overlay" onClick={() => setSelectedTrip(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <img src={selectedTrip.image} alt={selectedTrip.title} />
            <h2>{selectedTrip.title}</h2>
            <p>{selectedTrip.description}</p>
            <button
              className="book-btn"
              onClick={() => goToBookingPage(selectedTrip._id)}
            >
              Zur Buchung
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Trip;
