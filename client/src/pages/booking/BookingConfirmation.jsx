import { useLocation, useNavigate } from "react-router-dom";
import "./bookingConfirmation.css";

function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  const bookingData = location.state;

  if (!bookingData) {
    return (
      <div className="booking-confirmation">
        <p>❌ Keine Buchungsdaten gefunden.</p>
        <button onClick={() => navigate("/trips")}>Zurück zu allen Trips</button>
      </div>
    );
  }

  return (
    <div className="booking-confirmation">
      <h1>🎉 Buchung erfolgreich!</h1>
      <p>
        Vielen Dank, <strong>{bookingData.name}</strong>!
      </p>
      <p>
        Du hast <strong>{bookingData.participants}</strong> Platz/Plätze für die
        Tour <strong>{bookingData.trip.title}</strong> gebucht.
      </p>
      <img
        src={bookingData.trip.image || bookingData.trip.media?.[0]?.url}
        alt={bookingData.trip.title}
        className="booking-image"
      />
      <p>
        📧 Eine Bestätigung wurde an <strong>{bookingData.email}</strong>{" "}
        gesendet.
      </p>
      <p>
        💶 Preis: <strong>{bookingData.trip.price} €</strong>
      </p>
      <button onClick={() => navigate("/bookings/my")}>
        Zurück zu allen Trips
      </button>
    </div>
  );
}

export default BookingConfirmation;
