import {useState} from 'react'
import axios from 'axios'
function FakeCheckout() {
    const [orderId, setOrderId] = useState(null);
    const [paid, setPaid] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const createBooking = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/booking/create`, {
                tripId: "12345", // Replace with actual trip ID
                userId: "67890" // Replace with actual user ID
            });
            setOrderId(response.data.booking._id);
            setSuccess(response.data.message);
        }
        catch (error) {
            setError(error.response?.data?.message || "Frontend:An error occurred while creating the booking.");
        }finally {
            setTimeout(() => {
              setError(null);
              setSuccess(null);
            }, 2000);
        }
        
    }
    const payBooking = async () => {
        if (!orderId) return;
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/booking/pay/${orderId}`);
            if(response.data.status=='paid') {
                setPaid(true);
            }
          
            setSuccess(response.data.message);
        }
        catch (error) {
            setError(error.response?.data?.message || "Frontend:An error occurred while confirming the booking.");
        }finally {
            setTimeout(() => {
              setError(null);
              setSuccess(null);
            }, 2000);
        }
    }
  return (
    <div>
      <button onClick={createBooking}>Create Booking</button>
        {orderId && !paid && (
            <button onClick={payBooking}>Pay Fake</button>
        )}
        {paid && <p>Booking confirmed successfully!</p>}
    </div>
  )
}

export default FakeCheckout
