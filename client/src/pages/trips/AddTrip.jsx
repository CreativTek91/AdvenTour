import { useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import './trips.css'
import axios from "axios";

 const AddTrip = () => {
    const {addTrip}=useAuthStore();
      const [images, setImages] = useState([]);
      const [error, setError] = useState(null);
      const [success, setSuccess] = useState(null);
      const [files, setFiles] = useState([]);
  const [trip,setTrip] = useState({
    title: "",
    location: "",
    date: "",
    duration: 1,
    description: "",
    price: 0
  });

    const handleChange = (e) => {
        setTrip((prevTrip) => ({
            ...prevTrip,
            [e.target.name]: e.target.value,
        }));
    }

      const handleFileChange = (e) => {
        console.log(e.target.files);
        if (e.target.files) {
          setFiles((prev) => [...prev, ...e.target.files]);
        } else {
          setError("No files selected");
        }
      };
    
    const handleSubmit = async (e) => {
       e.preventDefault();
       let formData = new FormData();
      for(let file of files){
  formData.append("files", file);
}
    
      console.log("formDataFiles", formData);
        for (let key in trip) {
          formData.append(key, trip[key]);
        }
      console.log("formDataKey", formData);
        try {
         const res = await axios.post(
           "http://localhost:8834/api/trips/addTrip",formData,
           {
             headers: {
               "Content-Type": "multipart/form-data",
             },
           }
         );
           console.log("res", res);
         // const res = addTrip(formData);
           setSuccess({
             message: "Event created successfully",
             result: res.data,
           });
            setFiles([]);
        } catch (error) {
            console.error("Error adding trip:", error);
             setError(error.response?.data?.message || "An error occurred");
             setSuccess({
               message: "",
               result: null,
             });
        }
    }
    return (
      <div className="flex flex-col  mx-auto  bg-glass justify-center items-center mt-2 p-2 sm:mt-[5rem]">
        <h2 className="text-sm py-2 font-400 sm:text-2xl">Add a New Trip</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-3 justify-center items-center flex flex-col py-1 max-w-screen sm:p-6"
          encType="multipart/form-data"
        >
          <label htmlFor="title">Title</label>
          <input
          id="title"
            type="text"
            placeholder="Title"
            value={trip.title}
            onChange={handleChange}
            name="title"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <label htmlFor="location">Location</label>
          <input
          id="location"
            type="text"
            placeholder="Location"
            value={trip.location}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
            name="location"
          />
          <input
            type="date"
            value={trip.date}
            onChange={handleChange}
            name="date"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="number"
            placeholder="Duration (days)"
            value={trip.duration}
            onChange={handleChange}
            name="duration"
            required
            className="w-full p-2 border border-gray-300 rounded"
            min="1"
          />
          <textarea
            placeholder="Description"
            value={trip.description}
            onChange={handleChange}
            name="description"
            className="w-full p-2 border border-gray-300 rounded"
            required
          ></textarea>
          <input
            type="number"
            placeholder="Price"
            value={trip.price}
            onChange={handleChange}
            name="price"
            required
            className="w-full p-2 border border-gray-300 rounded"
            min="0"
          />
         
           <input
            type="file"
            name="files"
           
            onChange={handleFileChange}
            accept="image/*,video/*"
            multiple
            className="input w-full text-white"
          />

          <button type="submit" className="text-white text-center ">
            Add Trip
          </button> 
        </form>
      </div>
    );
};
export default AddTrip;

 {
   /* <input
            type="text"
            placeholder="Image URL"
            value={trip.image}
            onChange={handleCange}
            name="image"
            className="w-full p-2 border border-gray-300 rounded"
          /> */
 }
 {
   /* <input
            type="file"
            name="files"
            onChange={handlePreview}
            accept="image/*"
            multiple
            className="input w-full"
          /> */
 }