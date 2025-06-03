import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuthStore from "../../store/useAuthStore";

import "./booking.css";

function Booking() {
  const { tripId } = useParams();
  const { trips } = useAuthStore();
  const [trip, setTrip] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [participants, setParticipants] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const foundTrip = trips.find((t) => t._id === tripId);
    setTrip(foundTrip);
  }, [tripId, trips]);

  if (!trip) return <p>Lade Tripdaten...</p>;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Weiterleitung zur Bestätigungsseite mit State
    navigate("/booking/confirmation", {
      state: {
        name,
        email,
        participants,
        trip,
      },
    });
  };

  return (
    <div className="booking-page">
      <h1>Buchung für: {trip.title}</h1>
      <img src={trip.image || trip.media?.[0]?.url} alt={trip.title} className="booking-image" />
      <p>{trip.description}</p>
      <p>Preis: {trip.price} €</p>

      <form className="booking-form" onSubmit={handleSubmit}>
        <label>
          Dein Name:
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          E-Mail:
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Teilnehmeranzahl:
          <input
            type="number"
            min="1"
            required
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
          />
        </label>
        <button type="submit">Jetzt buchen</button>
      </form>
    </div>
  );
}

export default Booking;
