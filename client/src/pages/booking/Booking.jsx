// /AdvenTour/client/src/pages/booking/Booking.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import "./booking.css";

function Booking() {
  const { tripId } = useParams();
  const { trips, fetchTrips } = useAuthStore();
  const [trip, setTrip] = useState(null);

  /* Trip suchen oder nachladen */
  useEffect(() => {
    (async () => {
      if (trips.length === 0) await fetchTrips();
      const found = trips.find((t) => t._id === tripId);
      setTrip(found);
    })();
  }, [tripId, trips, fetchTrips]);

  if (!trip) return <p>Lade Tripdaten...</p>;

  return (
    <div className="booking-page">
      <h1>Buchung für: {trip.title}</h1>

      <img
        src={trip.image || trip.media?.[0]?.url}
        alt={trip.title}
        className="booking-image"
      />

      <p>{trip.description}</p>
      <p className="price">Preis: {trip.price} €</p>

      <form className="booking-form">
        <label>
          Dein Name:
          <input type="text" required />
        </label>
        <label>
          E‑Mail:
          <input type="email" required />
        </label>
        <label>
          Teilnehmeranzahl:
          <input type="number" min="1" required />
        </label>

        {/* hier später DUMMY‑Zahlung / Bestätigung */}
        <button type="submit">Jetzt buchen</button>
      </form>
    </div>
  );
}

export default Booking;
