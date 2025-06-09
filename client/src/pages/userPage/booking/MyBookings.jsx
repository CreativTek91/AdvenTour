import {useEffect,useState} from 'react';
import $api from '../../../http/api';
import useAuthStore from '../../../store/useAuthStore';


function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
const {loading,setLoading,user}=useAuthStore();
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
       await $api.get(
          `${import.meta.env.VITE_BACKEND_URL}/booking/my/${user.id}`,
        )
        .then((response) => {
          setBookings(response.data);
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId, setLoading]);
  if (loading) return <p>Lade Buchungen...</p>;
  if (error) return <p>{error}</p>;
  if (bookings.length === 0) return <p>Keine Buchungen gefunden.</p>;
  return (
    <div className="my-bookings">
      <h2>My bookings</h2>
     { bookings.map((booking) => (
        <div key={booking._id} className={`border p-4 rounded mb-3 ${booking.status === 'cancelled' ? 'bg-red-100' : booking.status === 'declined' ? 'bg-yellow-100' : 'bg-green-100'}`}>
          <h3>Booking ID: {booking._id}</h3>
          <p>Trip: {booking.tripId?.title}</p>
          <p>Status: {' '}</p>
          <strong>
            {booking.status=== 'cancelled' ? 'Cancelled' : booking.status === 'declined' ? 'Declined' : 'Confirmed'}
          </strong>
        </div>
      
     ))}
    </div>
  );    
  
}

export default MyBookings
