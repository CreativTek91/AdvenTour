import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import "./booking.css";

function Booking() {
  const { tripId } = useParams();
  const { trips } = useAuthStore();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const foundTrip = trips.find(t => t._id === tripId);
    setTrip(foundTrip);
  }, [tripId, trips]);

  if (!trip) return <p>Lade Tripdaten...</p>;

  return (
    <div className="booking-page">
      <h1>Buchung für: {trip.title}</h1>
      <img src={trip.image || trip.media?.[0]?.url} alt={trip.title} className="booking-image" />
      <p>{trip.description}</p>
      <p>Preis: {trip.price} €</p>

      <form className="booking-form">
        <label>
          Dein Name:
          <input type="text" required />
        </label>
        <label>
          E-Mail:
          <input type="email" required />
        </label>
        <label>
          Teilnehmeranzahl:
          <input type="number" min="1" required />
        </label>
        <button type="submit">Jetzt buchen</button>
      </form>
    </div>
  );
}

export default Booking;
