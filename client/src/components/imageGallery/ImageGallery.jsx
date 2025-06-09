
import { useEffect, useState } from "react";
import axios from "axios";
import Error from "../../components/errors/Error";
import Success from "../../components/success/Success";
import "./imageGallery.css";


export default function ImageGallery() {
  const [media, setMedia] = useState([]);
  const [error, setError] = useState(null);
const [success, setSuccess] = useState(null);
const [result, setResult] = useState(null);
  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const resp = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/media`);
      if (!resp.data || resp.data.length === 0) {
        setError("No media found");
        return;
      }
      setMedia(resp.data);
    } catch (err) {
      console.log("Error", err.response.data.error);
      setError(err.response.data.error);
      setMedia([]);
    }
    finally {
      setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 2000);
    }
  };

  const deleteMedia = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/media/${id}`);
      setMedia((prevMedia) => prevMedia.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting media:", error);
      setError(error.response?.data?.error || "Failed to delete media");
    }finally{
      setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 2000);
    }
  };
  const hadleAddMediaToTrip = async (id) => {
    try {
      
     const tripId= localStorage.getItem("trip_for_media");
      if (!tripId) {
        console.error("No trip ID found in local storage");
        return;
      }
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/trips/${tripId}/add_media`,
        { mediaId: id }
      );
      console.log("Media added to trip:", response.data);
      if( response.data.message) {
        setSuccess(response.data.message);
      }
      setResult(response.data.trip);
     
    } catch (error) {
      console.error("Error adding media to trip:", error);
    }finally{
      setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 2000);
    }
  };
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-4">
      {error && <Error error={error} />}
      {media?.length ? (
        media.map((med) => (
          <div
            key={med._id}
            className="flex flex-col items-center justify-center mx-auto lg:py-0 bg-glass my-10 w-48 h-48 rounded-lg shadow-lg"
          >
            {med.type ? (
              med.type === "image" ? (
                <img src={med.url} alt={med.url} className="imgGallery" />
              ) : (
                <video controls muted className="videoGallery">
                  <source src={med.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )
            ) : (
              <img src={med.url} alt={med.url} className="imgGallery" />
            )}
            <div>
              <button
                className="btnAdminMedia"
                onClick={() => deleteMedia(med._id)}
              >
                Delete
              </button>
              <button
                className="btnAdminMedia"
                onClick={() => {
                  hadleAddMediaToTrip(med._id);
                }}
              >
                Add To Trip
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No images </p>
      )}
    </div>
  );
}
