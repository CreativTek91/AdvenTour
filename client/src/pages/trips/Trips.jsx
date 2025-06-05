// /AdvenTour/client/src/pages/trips/Trips.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import TripCard from "./TripCard";
import "./trips.css";

function Trips() {
  const { trips, fetchTrips,isAuthenticated } = useAuthStore();
  const [currentPage, setCurrentPage] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState("featured");
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [transitionPhase, setTransitionPhase] = useState("");
  const [slideDirection, setSlideDirection] = useState("");
  const navigate = useNavigate();

  const tripsPerPage = 3;

  /* Trips aus dem Store holen */
  useEffect(() => {
    fetchTrips();

    // Query‑Param ?showAll=true abfangen
    const params = new URLSearchParams(window.location.search);
    if (params.get("showAll") === "true") {
      setShowAll(true);
      setFilter("all");
    }
  }, [fetchTrips]);

  /* Pagination‑Berechnung */
  const startIndex = currentPage * tripsPerPage;
  const visibleTrips = showAll
    ? trips
    : trips.slice(startIndex, startIndex + tripsPerPage);

  const hasNext = startIndex + tripsPerPage < trips.length;
  const hasPrev = currentPage > 0;

  /* Slide‑/Fade‑Animation */
  const handlePageChange = (direction) => {
    setTransitionPhase("fade-out");            // ausblenden
    setTimeout(() => {
      setSlideDirection(direction === "next" ? "slide-in" : "slide-in-reverse");
      setCurrentPage((prev) => prev + (direction === "next" ? 1 : -1));
      setTransitionPhase("");                 // fertig mit Fade‑Out
      setTimeout(() => setSlideDirection(""), 300); // Animation zurücksetzen
    }, 200);
  };

  /* Filter‑Dropdown */
  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    const shouldShowAll = value === "all";
    setShowAll(shouldShowAll);
    setCurrentPage(0);

    const params = new URLSearchParams(window.location.search);
    shouldShowAll ? params.set("showAll", "true") : params.delete("showAll");
    window.history.replaceState({}, "", `${window.location.pathname}?${params}`);
  };

  /* 🆕  zur Booking‑Route wechseln */
  const goToBookingPage = (tripId) => {
    navigate(`/booking/${tripId}`);
  };

  return (
    <div className="trip-wrapper">
      {/* ---------- Filter‑Bar ---------- */}
      <div className="filter-bar">
        <label htmlFor="tripFilter">Trips anzeigen:</label>
        <select id="tripFilter" value={filter} onChange={handleFilterChange}>
          <option value="featured">Empfohlen</option>
          <option value="all">Alle</option>
        </select>
      </div>

      {/* ---------- Trip‑Grid ---------- */}
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

      {/* ---------- Pagination ---------- */}
      {!showAll && (
        <div className="pagination-controls">
          <button
            onClick={() => handlePageChange("prev")}
            disabled={!hasPrev}
            className={`nav-btn ${!hasPrev ? "disabled" : ""}`}
          >
            &laquo; Zurück
          </button>
          <button
            onClick={() => handlePageChange("next")}
            disabled={!hasNext}
            className={`nav-btn ${!hasNext ? "disabled" : ""}`}
          >
            Nächste &raquo;
          </button>
        </div>
      )}

      {/* ---------- Modal ---------- */}
      {selectedTrip && (
        <div className="overlay" onClick={() => setSelectedTrip(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            {/* Bild über Cloudinary‑URL */}
            <img
              src={selectedTrip.image || selectedTrip.media?.[0]?.url}
              alt={selectedTrip.title}
            />
            <h2>{selectedTrip.title}</h2>
            <p>{selectedTrip.description}</p>

            {isAuthenticated ? (
              <button
                className="book-btn"
                onClick={() => goToBookingPage(selectedTrip._id)}
              >
                Zur Buchung
              </button>
            ) : (
              <>
                <h4 className="text-red-700 text-center text-lg text-bold border-2 border-red-700 p-2 rounded-lg bg-red-100 mb-4">
                  Bitte melde dich an, um eine Buchung vorzunehmen!!!
                </h4>
                <button
                  className="btn back"
                  onClick={() => {
                    setSelectedTrip(null);
                    navigate("/trips");
                  }}
                >
                  Back
                </button>
                <button
                  className="btn login"
                  onClick={() => navigate("/login")}
                >
                  Zur Anmeldung
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Trips;
