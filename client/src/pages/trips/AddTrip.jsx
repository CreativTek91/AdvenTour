import { useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import './trips.css'

 const AddTrip = () => {
    const {addTrip}=useAuthStore();
  const [trip,setTrip] = useState({
    title: "",
    location: "",
    date: "",
    duration: 1,
    description: "",
    price: 0,
    image: "",
  });

    const handleCange = (e) => {
        setTrip((prevTrip) => ({
            ...prevTrip,
            [e.target.name]: e.target.value,
        }));
    }
    const handleSubmit = async (e) => {
       e.preventDefault();
       let formData = new FormData();
      //  if (user) {
      //    formData.append("userId", user.id);
      //  }
        for (let key in trip) {
          formData.append(key, trip[key]);
        }
      
        try {
          // const res = await axios.post("http://localhost:8834/api/trips/addTrip", trip);
         const res = addTrip(trip);
          console.log("Trip added successfully:", res.data);
        } catch (error) {
            console.error("Error adding trip:", error);
        }
    }
    return (
      <div className="flex flex-col  mx-auto  glassTrip justify-center items-center mt-2 p-2 sm:mt-[5rem]">
        <h2 className="text-sm py-2 font-400 sm:text-2xl">Add a New Trip</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-3 justify-center items-center flex flex-col py-1 max-w-screen sm:p-6"
          encType="multipart/form-data"
        >
          <input
            type="text"
            placeholder="Title"
            value={trip.title}
            onChange={handleCange}
            name="title"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={trip.location}
            onChange={handleCange}
            className="w-full p-2 border border-gray-300 rounded"
            required
            name="location"
          />
          <input
            type="date"
            value={trip.date}
            onChange={handleCange}
            name="date"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="number"
            placeholder="Duration (days)"
            value={trip.duration}
            onChange={handleCange}
            name="duration"
            required
            className="w-full p-2 border border-gray-300 rounded"
            min="1"
          />
          <textarea
            placeholder="Description"
            value={trip.description}
            onChange={handleCange}
            name="description"
            className="w-full p-2 border border-gray-300 rounded"
            required
          ></textarea>
          <input
            type="number"
            placeholder="Price"
            value={trip.price}
            onChange={handleCange}
            name="price"
            required
            className="w-full p-2 border border-gray-300 rounded"
            min="0"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={trip.image}
            onChange={handleCange}
            name="image"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button type="submit" className="text-white text-center ">
            Add Trip
          </button>
        </form>
      </div>
    );
};
export default AddTrip;