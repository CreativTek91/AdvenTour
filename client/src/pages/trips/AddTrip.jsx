import { useState } from "react";
import useAuthStore from "../../store/useAuthStore";


export const AddTrip = () => {
    const {user,addTrip}=useAuthStore();
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
       e.peventDeault();
       const formData = new FormData();
       if (user) {
         formData.append("userId", user.id);
       }
        for (let key in trip) {
          formData.append(key, trip[key]);
        }
        try {
           const res=await  addTrip(trip);
            console.log("res", res.data);
           
          
            setTrip({
                title: "",
                location: "",
                date: "",
                duration: 1,
                description: "",
                price: 0,
                image: "",
            });
          
        } catch (error) {
            console.error("Error adding trip:", error);
        }
    }
    return (
      <div className="max-w-md mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4">Add a New Trip</h2>
        <form
          onSubmit={handleSubmit}
          method="POST"
        //   action="http://localhost:8834/api/trips/addTrip"
          className="space-y-4"
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
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Trip
          </button>
        </form>
      </div>
    );
};
