import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuthStore from "../../store/useAuthStore";
import axios from "axios";
import "./booking.css";
import Error from "../../components/errors/Error";
import Success from "../../components/success/Success";


function Booking() {
  const { tripId } = useParams();
  const { trips,user} = useAuthStore();
  const [trip, setTrip] = useState(null);
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [participants, setParticipants] = useState(1);
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState(null);
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const foundTrip = trips.find((t) => t._id === tripId);
    setTrip(foundTrip);
  }, [tripId, trips]);

  if (!trip) return <p>Lade Tripdaten...</p>;

 
  const createBooking = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/booking/create`,
        {
          tripId: trip._id, // Replace with actual trip ID
          userId: user.id, // Replace with actual user ID
          quantity: participants,
        }
      );
      setOrderId(response.data.booking._id);
      setSuccess(response.data.message);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Frontend:An error occurred while creating the booking."
      );
    } finally {
      setTimeout(() => {
        setError(null);
        setSuccess(null);
     
      }, 2000);
    }
  };

  const payBooking = async () => {
    if (!orderId) return;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/booking/pay/${orderId}`,
        
           user.id, // Replace with actual user ID
        
      );
      if (response.data.status == "paid") {
        setPaid(true);
      }

      setSuccess(response.data.message);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Frontend:An error occurred while confirming the booking."
      );
    } finally {
      setTimeout(() => {
        setError(null);
        setSuccess(null);
        setTrip(null);
        setOrderId(null);
        setPaid(false);
      }, 2000);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
createBooking();
console.log("Booking created Test");
    // // Weiterleitung zur Bestätigungsseite mit State
    // navigate("/booking/confirmation", {
    //   state: {
    //     name,
    //     email,
    //     participants,
    //     trip,
    //   },
    // });
  };

  return (
    <div className="booking-page">
      {error && <Error error={error} />}
      {success && <Success success={success} />}
      <h1>Buchung für: {trip.title}</h1>
      <img
        src={trip.image || trip.media?.[0]?.url}
        alt={trip.title}
        className="booking-image"
      />
      <p>{trip.description}</p>
      <p>Preis: {trip.price} €</p>
      <div>
        {orderId && !paid && <button onClick={payBooking}>Pay Fake</button>}
        {paid && <p>Booking confirmed successfully!</p>}
      </div>
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
            onChange={(e) => setEmail(()=>e.target.value)}
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
