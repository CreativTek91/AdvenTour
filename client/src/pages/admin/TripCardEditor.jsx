

import Success from "../../components/success/Success";
import { useState } from "react";
import "../trips/tripCard.css";
import Error from "../../components/errors/Error";

function TripCardEditor({ trip, updateTrip, deleteTrip }) {
  const [tripData, setTripData] = useState({
    _id: trip._id,
    title: trip.title,
    location: trip.location,
    date: trip.date,
    duration: trip.duration,
    description: trip.description,
    price: trip.price,
    media: [trip.media],
  });
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTripData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...newFiles]);
    setTripData((prev) => ({
      ...prev,
      media: [...prev.media, ...newFiles],
    }));
  };

  const handleUpdate = () => {
    let formData = new FormData();
    for (let key in tripData) {
      formData.append(key, tripData[key]);
    }

    files.forEach((file) => formData.append("files", file));

    updateTrip(formData, trip._id);
  };
const saveInMemory = (id) => {
    localStorage.setItem('trip_for_media', id);
    setSuccess("Trip saved in memory for media upload.");
    setTimeout(() => {
      setSuccess(null);
    }, 2000);
  }
  if(error)return <Error error={error} />;
  if(success) return <Success success={success} />; 
   
  
  return (
    <div className="adminTripCard">
      <label>Title:</label>
      <input
        name="title"
        type="text"
        value={tripData.title}
        onChange={handleInputChange}
      />

      <label>Location:</label>
      <input
        name="location"
        type="text"
        value={tripData.location}
        onChange={handleInputChange}
      />

      <label>Date:</label>
      <input
        name="date"
        type="date"
        value={tripData.date}
        onChange={handleInputChange}
      />

      <label>Duration:</label>
      <input
        name="duration"
        type="number"
        value={tripData.duration}
        onChange={handleInputChange}
      />
      <label>Description:</label>
      <textarea
        name="description"
        rows={3}
        value={tripData.description}
        onChange={handleInputChange}
      />

      <label>Price:</label>
      <input
        name="price"
        type="number"
        value={tripData.price}
        onChange={handleInputChange}
      />

      <ul className="flex flex-col sm:flex-row p-2 mx-auto gap-4">
        {trip.media?.map((m) => {
          return m.type ? (
            m.type === "image" ? (
              <li className="flex size-48" key={m.url}>
                <img src={m.url} alt={trip.title} className="size-48" />
              </li>
            ) : (
              <li className="flex size-48" key={m.url}>
                <video controls muted>
                  <source src={m.url} type="video/mp4" />
                </video>
              </li>
            )
          ) : (
            <li className="flex size-48" key={m.url}>
              <img src={m.url} alt={trip.title} className="size-48" />
            </li>
          );
        })}
      </ul>

      <input
        type="file"
        name="files"
        onChange={handleFileChange}
        accept="image/*,video/*"
        multiple
        className="input w-full text-white"
      />

      <div className="flex justify-center gap-2 mt-2">
        <button className="btn-card edit" onClick={handleUpdate}>
          Update
        </button>
        <button
          className="btn-card delete"
          onClick={() => deleteTrip(trip._id)}
        >
          Delete
        </button>
        <button
          className="btn-card "
          onClick={() => saveInMemory(trip._id)}
        >
          Save in Memory
        </button>
      </div>
    </div>
  );
}

export default TripCardEditor;