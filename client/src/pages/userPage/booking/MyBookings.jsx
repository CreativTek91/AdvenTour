import { useEffect, useState } from "react";
import $api from "../../../http/api";
import useAuthStore from "../../../store/useAuthStore";
import Button from "../../../components/button/Button";
import Success from "../../../components/success/Success";
import Error from "../../../components/errors/Error";
import { useNavigate } from "react-router-dom"; // Uncomment if you need navigation
function MyBookings() {
  const { user } = useAuthStore();
  const [paid, setPaid] = useState(false);
  const [success, setSuccess] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
const navigate = useNavigate(); // Uncomment if you need navigation
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        await $api.get("/booking/my").then((response) => {
          setBookings(response.data);
        });
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "An error occurred while fetching bookings."
        );
      }
    };

    fetchBookings();
  }, []);

  const payBooking = async (bookingId) => {
    if (!bookingId) return;
    console.log("FRONTEND:Paying booking with ID:", bookingId);
    try {
      const response = await $api.post(`/booking/pay/${bookingId}`);
      if (response.data.status == "paid") {
        setPaid(true);
      }

      setSuccess(response.data.message || "Booking paid successfully!");
      setBookings((prevBookings) =>
        prevBookings.map((b) =>
          b._id === bookingId ? { ...b, status: "paid" } : b
        )
      );
      // window.location.reload(); // Reload the page to reflect the updated booking status
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Frontend:An error occurred while confirming the booking."
      );
    } finally {
      setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 2000);
    }
  };

  const handleDownloadTicket = async (bookingId) => {
    if (!bookingId) return;
    try{
       await $api
      .get(`/booking/ticket/${bookingId}`, {
        responseType: "blob", // Important for downloading files
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `ticket-${bookingId}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
    catch (error) {
      setError(
        error.response?.data?.message ||
          "An error occurred while downloading the ticket.Only paid bookings can download tickets."
      );
    } finally {
      setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 2000);
    }
  };
  const handleCancelBooking = async (bookingId) => {
    if (!bookingId) return;
    console.log("FRONTEND: Cancelling booking with ID:", bookingId);
    try {
      const response = await $api.delete(`/booking/cancel/${bookingId}`, {
        data: { reason: "User requested cancellation" }, // Optional cancellation reason
      });
      setSuccess(response.data.message || "Booking cancelled successfully!");
      setBookings((prevBookings) =>
        prevBookings.map((b) =>
          b._id === bookingId ? { ...b, status: "cancelled" } : b
        )
      );
      // window.location.reload(); // Reload the page to reflect the updated booking status
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "An error occurred while cancelling the booking."
      );
    } finally {
      setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 2000);
    }
  };
 
  if (error) return <Error error={error} />;
  if (success) return <Success success={success} />;
  if (bookings.length === 0) return (<><Error error='Keine Buchungen gefunden.'/>
    <Button
    onClick={() => navigate("/profile/id")}
    className="bg-blue-500 text-white hover:bg-blue-600"
  />
  </>
  );
  return (
    <div className="@container  px-4 md:px-8">
      <h2 className="text-lg md:text-2xl font-semibold my-6 ">
        My bookings{" "}
        <span>
          {" "}
          <Button
            onClick={() => navigate("/profile/id")}
            className="bg-blue-500 text-white hover:bg-blue-600"
          />
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 justify-center items-center">
        {bookings &&
          bookings?.map((booking) => (
            <div
              key={booking._id}
              className={`w-full text-[black]  md:w-[fit-content] sm:items-center flex flex-col justify-center items-start shadow-md rounded-2xl p-4  border-l-4  ${
                booking.status === "cancelled"
                  ? "bg-red-100"
                  : booking.status === "confirmed"
                  ? "bg-blue-100"
                  : booking.status === "pending"
                  ? "bg-yellow-100"
                  : "bg-green-100"
              }`}
            >
              <p>Booking ID:</p>
              <p className="text-ellipsis md:text-clip md:text-center text-gray-800 font-semibold">
                {" "}
                {booking._id}
              </p>
              <p>Trip: </p>
              <p className="text-ellipsis md:text-center  text-gray-800 font-semibold mb-4">
                {booking.tripId?.title || "Trip details not available"}
              </p>
              <p className="text-bold ">
                Status:
                <span
                  className={`status ${
                    booking.status === "cancelled"
                      ? "cancelled"
                      : booking.status === "confirmed"
                      ? "confirmed"
                      : booking.status === "paid"
                      ? "paid"
                      : "pending"
                  }`}
                >
                  {" "}
                  {booking.status === "cancelled"
                    ? "Cancelled"
                    : booking.status === "confirmed"
                    ? "Confirmed"
                    : booking.status === "pending"
                    ? "Pending"
                    : "Paid"}
                </span>
              </p>
              <section className="flex flex-col md:flex-row flex-wrap gap-2 items-center justify-between w-full">
                {paid && <p>Booking confirmed successfully!</p>}
                {booking && !paid && (
                  <Button onClick={() => payBooking(booking._id)}>
                    Pay Booking
                  </Button>
                )}
                <Button onClick={() => handleCancelBooking(booking._id)}>
                  Cancel Booking
                </Button>
                <Button onClick={() => handleDownloadTicket(booking._id)}>
                  Download Ticket
                </Button>
              </section>
            </div>
          ))}
      </div>
    </div>
  );
}

export default MyBookings;
